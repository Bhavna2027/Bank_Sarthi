from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from app.infrastructure.repositories import InMemoryRepository
from app.domain.models import Budget, Transaction, User

router = APIRouter(prefix='/api/v1')
repository = InMemoryRepository()


class RegisterRequest(BaseModel):
    email: str = Field(..., min_length=3)
    password: str = Field(..., min_length=8)
    preferred_language: str = 'en'


class LoginRequest(BaseModel):
    email: str
    password: str


class TransactionCreate(BaseModel):
    merchant: str
    amount: float
    txn_type: str
    txn_date: str
    category: str | None = None
    is_recurring: bool = False


class BudgetCreate(BaseModel):
    category: str
    monthly_limit: float


@router.get('/health')
def health() -> dict[str, str]:
    return {'status': 'ok'}


@router.post('/auth/register', status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest) -> dict[str, str]:
    if repository.get_user_by_email(payload.email):
        raise HTTPException(status_code=409, detail='email_exists')
    user = User(id='user-1', email=payload.email, password_hash='hashed', preferred_language=payload.preferred_language)
    repository.create_user(user)
    return {'message': 'registered', 'email': user.email}


@router.post('/auth/login')
def login(payload: LoginRequest) -> dict[str, str]:
    user = repository.get_user_by_email(payload.email)
    if not user or payload.password != 'password':
        raise HTTPException(status_code=401, detail='invalid_credentials')
    return {'message': 'logged_in', 'email': user.email}


@router.get('/transactions')
def list_transactions(user_id: str) -> list[dict]:
    return [
        {'id': txn.id, 'merchant': txn.merchant, 'amount': txn.amount, 'txn_type': txn.txn_type, 'txn_date': txn.txn_date, 'category': txn.category}
        for txn in repository.list_transactions(user_id)
    ]


@router.post('/transactions', status_code=status.HTTP_201_CREATED)
def create_transaction(payload: TransactionCreate, user_id: str) -> dict[str, object]:
    txn = Transaction(id='txn-1', user_id=user_id, merchant=payload.merchant, amount=payload.amount, txn_type=payload.txn_type, txn_date=payload.txn_date, category=payload.category, is_recurring=payload.is_recurring)
    repository.create_transaction(txn)
    return {'id': txn.id, 'message': 'created'}


@router.get('/budgets')
def list_budgets(user_id: str) -> list[dict]:
    return [
        {'id': budget.id, 'category': budget.category, 'monthly_limit': budget.monthly_limit}
        for budget in repository.list_budgets(user_id)
    ]


@router.post('/budgets', status_code=status.HTTP_201_CREATED)
def create_budget(payload: BudgetCreate, user_id: str) -> dict[str, object]:
    budget = Budget(id='budget-1', user_id=user_id, category=payload.category, monthly_limit=payload.monthly_limit)
    repository.create_budget(budget)
    return {'id': budget.id, 'message': 'created'}
