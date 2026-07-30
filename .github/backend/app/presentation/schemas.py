from pydantic import BaseModel, EmailStr, Field


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    preferred_language: str = 'en'


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TransactionCreate(BaseModel):
    merchant: str
    amount: float = Field(..., ge=0)
    txn_type: str
    txn_date: str
    category: str | None = None
    is_recurring: bool = False


class BudgetCreate(BaseModel):
    category: str = Field(..., min_length=2)
    monthly_limit: float = Field(..., gt=0)
