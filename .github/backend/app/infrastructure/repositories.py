from typing import List

from app.domain.models import Budget, Transaction, User


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
