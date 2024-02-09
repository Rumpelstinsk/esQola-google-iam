from fastapi import FastAPI, HTTPException

from backend.db import UserRepository
from backend.entities import LoginData

app = FastAPI()


@app.post("/login")
async def post_login(data: LoginData):
    try:
        return UserRepository().get(email=data.user, password=data.password)
    except Exception:
        raise HTTPException(status_code=404, detail="Item not found")

