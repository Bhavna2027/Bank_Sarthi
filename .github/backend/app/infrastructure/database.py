import os
from sqlalchemy import Boolean, Column, DateTime, Float, Integer, String, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///./banksarthi.db')

connect_args = {'check_same_thread': False} if DATABASE_URL.startswith('sqlite') else {}
engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class UserORM(Base):
    __tablename__ = 'users'
    id = Column(String, primary_key=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    preferred_language = Column(String, default='en')
    total_xp = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)


class TransactionORM(Base):
    __tablename__ = 'transactions'
    id = Column(String, primary_key=True)
    user_id = Column(String, index=True, nullable=False)
    merchant = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    txn_type = Column(String, nullable=False)
    txn_date = Column(String, nullable=False)
    category = Column(String, nullable=True)
    is_recurring = Column(Boolean, default=False)


class BudgetORM(Base):
    __tablename__ = 'budgets'
    id = Column(String, primary_key=True)
    user_id = Column(String, index=True, nullable=False)
    category = Column(String, nullable=False)
    monthly_limit = Column(Float, nullable=False)


Base.metadata.create_all(bind=engine)
