from datetime import datetime, timezone, timedelta

from fastapi import HTTPException
from jose import jwt

from constants import JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRE_MINUTES
from entities import User


def create_jwt_token(user: User) -> str:
    to_encode = user.dict()
    to_encode.update({"exp": datetime.now(timezone.utc) + timedelta(minutes=JWT_EXPIRE_MINUTES)})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_jwt_token(jwt_token: str) -> User:
    if jwt_token is None:
        raise HTTPException(status_code=404, detail="YOU SHALL NOT PASS!!")

    payload = jwt.decode(jwt_token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    try:
        return User(**payload)
    except Exception:
        raise HTTPException(status_code=404, detail="THE CAKE IS A LIE!!!")
