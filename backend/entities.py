from pydantic import BaseModel


class LoginData(BaseModel):
    user: str
    password: str


class User(BaseModel):
    id: int
    name: str
    email: str
    