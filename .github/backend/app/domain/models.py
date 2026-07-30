from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional

@dataclass
class User:
    id: str
    email: str
    password_hash: str
    preferred_language: str = 'en'
    total_xp: int = 0
    is_active: bool = True
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

@dataclass
class Transaction:
    id: str
    user_id: str
    merchant: str
    amount: float
    txn_type: str
    txn_date: str
    category: Optional[str] = None
    is_recurring: bool = False
    created_at: Optional[datetime] = None

@dataclass
class Budget:
    id: str
    user_id: str
    category: str
    monthly_limit: float
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
