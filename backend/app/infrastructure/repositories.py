from typing import List, Optional

from app.domain.models import Budget, Transaction, User
from app.infrastructure.database import get_mongo_db


class InMemoryRepository:
    def __init__(self) -> None:
        self.users: list[User] = []
        self.transactions: list[Transaction] = []
        self.budgets: list[Budget] = []

    def create_user(self, user: User) -> User:
        self.users.append(user)
        return user

    def get_user_by_email(self, email: str) -> User | None:
        return next((user for user in self.users if user.email == email), None)

    def list_transactions(self, user_id: str) -> list[Transaction]:
        return [txn for txn in self.transactions if txn.user_id == user_id]

    def create_transaction(self, txn: Transaction) -> Transaction:
        self.transactions.append(txn)
        return txn

    def list_budgets(self, user_id: str) -> list[Budget]:
        return [budget for budget in self.budgets if budget.user_id == user_id]

    def create_budget(self, budget: Budget) -> Budget:
        self.budgets.append(budget)
        return budget


class MongoRepository:
    def __init__(self, db=None) -> None:
        self.db = db if db is not None else get_mongo_db()
        self.users_col = self.db['users']
        self.transactions_col = self.db['transactions']
        self.budgets_col = self.db['budgets']
        # Ping database to verify connection and authentication immediately
        self.db.command('ping')


    def create_user(self, user: User) -> User:
        user_doc = {
            "id": user.id,
            "email": user.email,
            "password_hash": user.password_hash,
            "preferred_language": user.preferred_language,
            "total_xp": user.total_xp,
            "is_active": user.is_active,
            "created_at": user.created_at,
            "updated_at": user.updated_at,
        }
        self.users_col.update_one({"id": user.id}, {"$set": user_doc}, upsert=True)
        return user

    def get_user_by_email(self, email: str) -> Optional[User]:
        doc = self.users_col.find_one({"email": email})
        if not doc:
            return None
        return User(
            id=doc.get("id", str(doc.get("_id"))),
            email=doc["email"],
            password_hash=doc.get("password_hash", ""),
            preferred_language=doc.get("preferred_language", "en"),
            total_xp=doc.get("total_xp", 0),
            is_active=doc.get("is_active", True),
            created_at=doc.get("created_at"),
            updated_at=doc.get("updated_at"),
        )

    def list_transactions(self, user_id: str) -> list[Transaction]:
        docs = self.transactions_col.find({"user_id": user_id})
        return [
            Transaction(
                id=doc.get("id", str(doc.get("_id"))),
                user_id=doc["user_id"],
                merchant=doc["merchant"],
                amount=float(doc["amount"]),
                txn_type=doc["txn_type"],
                txn_date=doc["txn_date"],
                category=doc.get("category"),
                is_recurring=doc.get("is_recurring", False),
                created_at=doc.get("created_at"),
            )
            for doc in docs
        ]

    def create_transaction(self, txn: Transaction) -> Transaction:
        doc = {
            "id": txn.id,
            "user_id": txn.user_id,
            "merchant": txn.merchant,
            "amount": txn.amount,
            "txn_type": txn.txn_type,
            "txn_date": txn.txn_date,
            "category": txn.category,
            "is_recurring": txn.is_recurring,
            "created_at": txn.created_at,
        }
        self.transactions_col.update_one({"id": txn.id}, {"$set": doc}, upsert=True)
        return txn

    def list_budgets(self, user_id: str) -> list[Budget]:
        docs = self.budgets_col.find({"user_id": user_id})
        return [
            Budget(
                id=doc.get("id", str(doc.get("_id"))),
                user_id=doc["user_id"],
                category=doc["category"],
                monthly_limit=float(doc["monthly_limit"]),
                created_at=doc.get("created_at"),
                updated_at=doc.get("updated_at"),
            )
            for doc in docs
        ]

    def create_budget(self, budget: Budget) -> Budget:
        doc = {
            "id": budget.id,
            "user_id": budget.user_id,
            "category": budget.category,
            "monthly_limit": budget.monthly_limit,
            "created_at": budget.created_at,
            "updated_at": budget.updated_at,
        }
        self.budgets_col.update_one({"id": budget.id}, {"$set": doc}, upsert=True)
        return budget

