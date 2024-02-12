from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from db import UserRepository
from entities import LoginData

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/login")
async def post_login(data: LoginData):
    try:
        return UserRepository().get(email=data.user, password=data.password)
    except Exception:
        raise HTTPException(status_code=404, detail="Item not found")
