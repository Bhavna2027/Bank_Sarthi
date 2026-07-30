-- ============================================================================
-- BankOPedia MVP Schema — PostgreSQL 15+
-- Scope: PRD FR-001..FR-045 + TRD event/prompt requirements. MVP-sized
-- (5k users). No partitioning/DR baked in — see design_notes.md for triggers.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;   -- gen_random_uuid(), digest()
CREATE EXTENSION IF NOT EXISTS pg_trgm;    -- fuzzy term search (FR-022)

CREATE TYPE txn_type       AS ENUM ('debit', 'credit');
CREATE TYPE job_status     AS ENUM ('pending', 'validating', 'parsing', 'mapping', 'completed', 'failed');
CREATE TYPE chat_role      AS ENUM ('user', 'assistant');
CREATE TYPE lang_code      AS ENUM ('en', 'hi', 'mr');

-- ----------------------------------------------------------------------------
-- users
-- UUID pk: exposed in JWT sub claim and every FK below; never sequential-guessable.
-- ----------------------------------------------------------------------------
CREATE TABLE users (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email               VARCHAR(255) NOT NULL,
    password_hash       VARCHAR(255) NOT NULL,   -- Argon2id: pick ADR-002, ~97 chars typical, 255 is safe headroom
    preferred_language  lang_code NOT NULL DEFAULT 'en',
    total_xp            INTEGER NOT NULL DEFAULT 0 CHECK (total_xp >= 0),
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,   -- session invalidation target (FR-008), soft-delete flag
    deleted_at          TIMESTAMPTZ,                     -- DPDP "delete my data" — soft delete, hard-purge via job after grace period
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- Partial unique index: allows email reuse after soft-delete, blocks dupes among live accounts.
CREATE UNIQUE INDEX ux_users_email_active ON users (email) WHERE deleted_at IS NULL;

-- ----------------------------------------------------------------------------
-- consents (FR/TRD §14 governance — was missing from PRD schema)
-- ----------------------------------------------------------------------------
CREATE TABLE consents (
    id          BIGSERIAL PRIMARY KEY,        -- internal only, never exposed → serial is fine
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    version     VARCHAR(20) NOT NULL,
    given_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    ip_address  INET NOT NULL
);
CREATE INDEX ix_consents_user ON consents(user_id);
-- ON DELETE CASCADE: consent records have no meaning without the user; deleting
-- the user (DPDP erasure) should remove them, not orphan them.

-- ----------------------------------------------------------------------------
-- audit_logs (STRIDE "Repudiation" mitigation — append-only, tamper-evident)
-- ----------------------------------------------------------------------------
CREATE TABLE audit_logs (
    id          BIGSERIAL PRIMARY KEY,
    user_id     UUID REFERENCES users(id) ON DELETE SET NULL,  -- keep the log row even if user is erased
    action      VARCHAR(100) NOT NULL,       -- e.g. 'login_success', 'login_failure', 'csv_upload'
    ip_address  INET,
    metadata    JSONB,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ix_audit_user_time ON audit_logs(user_id, created_at DESC);
-- ON DELETE SET NULL (not CASCADE): audit trail must survive account deletion —
-- that's the entire point of an audit log. This directly fixes the tension
-- between "delete my data" and "keep tamper-proof audit logs" that the TRD
-- never reconciled.

-- ----------------------------------------------------------------------------
-- category_mapping_rules — static keyword→category table (FR-037/038)
-- ----------------------------------------------------------------------------
CREATE TABLE category_mapping_rules (
    id          SERIAL PRIMARY KEY,
    keyword     VARCHAR(100) NOT NULL,       -- e.g. 'zomato', 'uber'
    category    VARCHAR(50) NOT NULL,
    UNIQUE (keyword)
);

-- ----------------------------------------------------------------------------
-- csv_upload_jobs — the async job entity the API contract requires but §14 lacked
-- (created before transactions, which references it)
-- ----------------------------------------------------------------------------
CREATE TABLE csv_upload_jobs (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- this IS job_id in the API response
    user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    file_hash    VARCHAR(64) NOT NULL,      -- sha256 of raw file, for FR "duplicate upload" 409 check
    status       job_status NOT NULL DEFAULT 'pending',
    error_code   VARCHAR(50),
    summary      JSONB,                     -- {total_spent, categories, recurring[]} — write-once on completion
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    completed_at TIMESTAMPTZ
);
CREATE INDEX ix_csv_jobs_user_recent ON csv_upload_jobs(user_id, created_at DESC);
-- Duplicate-check only needs the last 3 jobs per user (per edge-case table) —
-- served by the above index with LIMIT 3, no separate table needed.

-- ----------------------------------------------------------------------------
-- transactions — hot table, append-mostly, ~50k rows/day at MVP scale
-- ----------------------------------------------------------------------------
CREATE TABLE transactions (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    upload_job_id    UUID REFERENCES csv_upload_jobs(id) ON DELETE SET NULL,
    txn_date         DATE NOT NULL,
    merchant         VARCHAR(255),
    amount           DECIMAL(10,2) NOT NULL CHECK (amount >= 0),  -- absolute value per PRD; sign lives in txn_type
    txn_type         txn_type NOT NULL,
    category         VARCHAR(50),
    is_recurring     BOOLEAN NOT NULL DEFAULT FALSE,
    category_override BOOLEAN NOT NULL DEFAULT FALSE,  -- FR-042: user manually recategorized
    dedup_hash       VARCHAR(64) NOT NULL,              -- sha256(date||merchant||amount||user_id), enforces Open-Q3 dedup EXACTLY (decimal, no "within 1 cent" fuzziness needed)
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX ux_transactions_dedup ON transactions(user_id, dedup_hash);
CREATE INDEX ix_transactions_user_date ON transactions(user_id, txn_date DESC);   -- dashboard/monthly queries
CREATE INDEX ix_transactions_recurring ON transactions(user_id) WHERE is_recurring;  -- partial index, "Subscriptions" tab is a minority of rows
-- ON DELETE CASCADE from users: transaction rows are meaningless without an owner
-- and DPDP erasure must remove them.

-- ----------------------------------------------------------------------------
-- bankopedia_terms — fixes the UNIQUE(term) bug that broke multi-language rows
-- ----------------------------------------------------------------------------
CREATE TABLE bankopedia_terms (
    id          SERIAL PRIMARY KEY,
    term        VARCHAR(100) NOT NULL,
    definition  TEXT NOT NULL CHECK (char_length(definition) <= 2000),  -- ~300 words
    example     TEXT,
    category    VARCHAR(50),
    language    lang_code NOT NULL DEFAULT 'en',
    UNIQUE (term, language)          -- FIX: was UNIQUE(term) alone, which cannot
                                      -- hold en/hi/mr rows for the same concept.
);
CREATE INDEX ix_bankopedia_term_trgm ON bankopedia_terms USING GIN (term gin_trgm_ops);
-- pg_trgm GIN, not plain GIN: FR-022 wants fuzzy/Levenshtein-style match, trigram
-- similarity is what actually supports that; a plain GIN on text doesn't.

-- ----------------------------------------------------------------------------
-- Quiz engine — topics/questions are reference data; attempts are the hot table
-- ----------------------------------------------------------------------------
CREATE TABLE quiz_topics (
    id    SERIAL PRIMARY KEY,
    name  VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE quiz_questions (
    id            SERIAL PRIMARY KEY,
    topic_id      INTEGER NOT NULL REFERENCES quiz_topics(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    explanation   TEXT
);
CREATE INDEX ix_questions_topic ON quiz_questions(topic_id);

CREATE TABLE quiz_options (
    id           SERIAL PRIMARY KEY,
    question_id  INTEGER NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
    option_text  TEXT NOT NULL,
    is_correct   BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE INDEX ix_options_question ON quiz_options(question_id);

CREATE TABLE quiz_attempts (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    topic_id          INTEGER NOT NULL REFERENCES quiz_topics(id),
    question_set_hash VARCHAR(64) NOT NULL,   -- sha256 of sorted question ids — enforces FR-033 (no repeat in 24h)
    score             INTEGER NOT NULL CHECK (score BETWEEN 0 AND 10),
    xp_earned         INTEGER NOT NULL DEFAULT 0,
    started_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    completed_at      TIMESTAMPTZ
);
-- FR-033 check ("same question set in 24h") = SELECT 1 FROM quiz_attempts
-- WHERE user_id=? AND topic_id=? AND question_set_hash=? AND started_at > now()-interval '24 hours'
CREATE INDEX ix_attempts_user_topic_time ON quiz_attempts(user_id, topic_id, started_at DESC);
-- Serves both FR-032 (last-3-attempts mastery avg) and FR-033 (24h repeat check).

CREATE TABLE quiz_attempt_answers (
    id                BIGSERIAL PRIMARY KEY,
    attempt_id        UUID NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
    question_id       INTEGER NOT NULL REFERENCES quiz_questions(id),
    selected_option_id INTEGER REFERENCES quiz_options(id),
    is_correct        BOOLEAN NOT NULL
);
CREATE INDEX ix_answers_attempt ON quiz_attempt_answers(attempt_id);

-- ----------------------------------------------------------------------------
-- Badges — reference data + join table
-- ----------------------------------------------------------------------------
CREATE TABLE badges (
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(100) NOT NULL UNIQUE,
    criteria  TEXT NOT NULL      -- human-readable rule; MVP has no rule engine, evaluated in app code
);

CREATE TABLE user_badges (
    user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_id   INTEGER NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
    earned_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, badge_id)   -- a badge is earned once; composite PK also is the natural index
);

-- ----------------------------------------------------------------------------
-- budgets (US-04 — was entirely absent from §14 schema)
-- ----------------------------------------------------------------------------
CREATE TABLE budgets (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category      VARCHAR(50) NOT NULL,
    monthly_limit DECIMAL(10,2) NOT NULL CHECK (monthly_limit > 0),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, category)   -- one active limit per category per user; re-set = update, not insert
);

-- ----------------------------------------------------------------------------
-- health_score_history — required for Goal #5 ("+10 points in 3 months"),
-- which is un-measurable without a time series. §14 only implied a single value.
-- ----------------------------------------------------------------------------
CREATE TABLE health_score_history (
    id               BIGSERIAL PRIMARY KEY,
    user_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    score             SMALLINT NOT NULL CHECK (score BETWEEN 0 AND 100),
    savings_rate      DECIMAL(5,2),
    essentials_ratio  DECIMAL(5,2),
    debt_ratio        DECIMAL(5,2),
    calculated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ix_health_user_time ON health_score_history(user_id, calculated_at DESC);

-- ----------------------------------------------------------------------------
-- Voice/chat — FR-015 (3-turn context) is Redis-live, but a durable transcript
-- is needed for FR-018 ("visible in chat UI") and analytics events.
-- ----------------------------------------------------------------------------
CREATE TABLE chat_sessions (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- this is context_id in the API
    user_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    language       lang_code NOT NULL,
    started_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_active_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ix_chat_sessions_user ON chat_sessions(user_id, last_active_at DESC);

CREATE TABLE chat_messages (
    id          BIGSERIAL PRIMARY KEY,
    session_id  UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    role        chat_role NOT NULL,
    content     TEXT NOT NULL CHECK (char_length(content) <= 500),  -- FR-020 TTS char cap, applied to assistant rows
    intent      VARCHAR(30),          -- 'definition' | 'greeting' | 'unknown'
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    -- No audio blob column: FR-005/FR-043 pattern (never persist raw media) applies
    -- here too — audio is transient, only the transcript is durable.
);
CREATE INDEX ix_chat_messages_session ON chat_messages(session_id, created_at);

-- ----------------------------------------------------------------------------
-- prompt_templates (TRD §11.1 — chatbot guardrail versioning)
-- ----------------------------------------------------------------------------
CREATE TABLE prompt_templates (
    id            SERIAL PRIMARY KEY,
    version       VARCHAR(20) NOT NULL UNIQUE,   -- SemVer per TRD
    template_text TEXT NOT NULL,
    is_active     BOOLEAN NOT NULL DEFAULT FALSE,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX ux_prompt_one_active ON prompt_templates(is_active) WHERE is_active;
-- Partial unique index guarantees exactly one active prompt version at a time —
-- an invariant the TRD states in prose but never enforces at the data layer.
