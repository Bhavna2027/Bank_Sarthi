from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_register_endpoint() -> None:
    response = client.post('/api/v1/auth/register', json={'email': 'user@example.com', 'password': 'password123', 'preferred_language': 'en'})
    assert response.status_code == 201
    assert response.json()['message'] == 'registered'


def test_transactions_endpoint() -> None:
    response = client.post('/api/v1/transactions?user_id=user-1', json={'merchant': 'Coffee', 'amount': 120.5, 'txn_type': 'debit', 'txn_date': '2024-10-01'})
    assert response.status_code == 201
    assert response.json()['message'] == 'created'
