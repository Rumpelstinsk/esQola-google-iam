from datetime import datetime, timezone, timedelta

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt

from constants import JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRE_MINUTES, JWT_COOKIE_NAME
from db import UserRepository
from entities import LoginData, User

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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


@app.post("/login")
async def post_login(data: LoginData):
    try:
        user = UserRepository().get(email=data.user, password=data.password)
    except Exception:
        raise HTTPException(status_code=404, detail="Item not found")

    response = JSONResponse(content=user.dict())
    response.set_cookie(key=JWT_COOKIE_NAME, value=create_jwt_token(user))
    return response


@app.post("/secured")
async def post_secured(request: Request):
    jwt_token = request.cookies.get(JWT_COOKIE_NAME)
    if jwt_token is None:
        raise HTTPException(status_code=404, detail="YOU SHALL NOT PASS!!")

    user = decode_jwt_token(jwt_token)
    return {"message": f"{user.name} never gonna give you up"}
