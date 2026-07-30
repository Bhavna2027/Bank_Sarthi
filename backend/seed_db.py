import sys
from datetime import datetime, timezone
from app.domain.models import User, Transaction, Budget
from app.infrastructure.repositories import MongoRepository, InMemoryRepository

def seed_database(repo):
    print("Seeding database...")
    
    # 1. Seed Demo User
    user = User(
        id="user-1",
        email="demo@banksarthi.com",
        password_hash="$2b$12$eImiTXuWVxfM37uY4JANjO5E.q.g3Vq3q.3q3q3q3q3q",
        preferred_language="en",
        total_xp=250,
        is_active=True,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    repo.create_user(user)
    print(f"[OK] User created: {user.email}")

    # 2. Seed Sample Transactions
    transactions = [
        Transaction(
            id="txn-101",
            user_id="user-1",
            merchant="Swiggy Food",
            amount=450.0,
            txn_type="debit",
            txn_date="2026-07-28",
            category="Food & Dining",
            is_recurring=False,
            created_at=datetime.now(timezone.utc)
        ),
        Transaction(
            id="txn-102",
            user_id="user-1",
            merchant="Tech Salary",
            amount=75000.0,
            txn_type="credit",
            txn_date="2026-07-01",
            category="Income",
            is_recurring=True,
            created_at=datetime.now(timezone.utc)
        ),
        Transaction(
            id="txn-103",
            user_id="user-1",
            merchant="Amazon Electronics",
            amount=2499.0,
            txn_type="debit",
            txn_date="2026-07-20",
            category="Shopping",
            is_recurring=False,
            created_at=datetime.now(timezone.utc)
        ),
        Transaction(
            id="txn-104",
            user_id="user-1",
            merchant="Netflix Subscription",
            amount=499.0,
            txn_type="debit",
            txn_date="2026-07-15",
            category="Entertainment",
            is_recurring=True,
            created_at=datetime.now(timezone.utc)
        ),
        Transaction(
            id="txn-105",
            user_id="user-1",
            merchant="Electricity Bill",
            amount=1850.0,
            txn_type="debit",
            txn_date="2026-07-10",
            category="Utilities",
            is_recurring=True,
            created_at=datetime.now(timezone.utc)
        )
    ]
    for txn in transactions:
        repo.create_transaction(txn)
    print(f"[OK] {len(transactions)} Transactions seeded.")

    # 3. Seed Sample Budgets
    budgets = [
        Budget(
            id="bgt-1",
            user_id="user-1",
            category="Food & Dining",
            monthly_limit=8000.0,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Budget(
            id="bgt-2",
            user_id="user-1",
            category="Shopping",
            monthly_limit=10000.0,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        ),
        Budget(
            id="bgt-3",
            user_id="user-1",
            category="Entertainment",
            monthly_limit=3000.0,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        )
    ]
    for bgt in budgets:
        repo.create_budget(bgt)
    print(f"[OK] {len(budgets)} Budgets seeded.")
    print("SUCCESS: Database seeding complete!")

if __name__ == "__main__":
    try:
        repo = MongoRepository()
        print("Connected to MongoRepository.")
    except Exception as e:
        print(f"Mongo connection notice: {e}. Running fallback/local seeding.")
        repo = InMemoryRepository()
    seed_database(repo)
