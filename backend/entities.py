from pydantic import BaseModel


class LoginData(BaseModel):
    user: str
    password: str


class User(BaseModel):
    id: str
    name: str
    email: str
    