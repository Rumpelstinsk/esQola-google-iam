from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from constants import JWT_COOKIE_NAME
from db import UserRepository
from entities import LoginData
from jwt_utils import create_jwt_token, decode_jwt_token
from middleware import ValidateJWTMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Método para hacer loggin
# Devuelve el usuario y crea una cookie con el jwt
@app.post("/login")
async def post_login(data: LoginData):
    try:
        user = UserRepository().get(email=data.user, password=data.password)
    except Exception:
        raise HTTPException(status_code=404, detail="Item not found")

    response = JSONResponse(content=user.dict())
    response.set_cookie(key=JWT_COOKIE_NAME, value=create_jwt_token(user))
    return response


# Método que solo funciona si el jwt es válido
# Comprueba el token directamente
@app.post("/secured")
async def post_secured(request: Request):
    jwt_token = request.cookies.get(JWT_COOKIE_NAME)
    if jwt_token is None:
        raise HTTPException(status_code=404, detail="YOU SHALL NOT PASS!!")

    user = decode_jwt_token(jwt_token)
    return {"message": f"{user.name} never gonna give you up"}


private_app = FastAPI()
private_app.add_middleware(
    ValidateJWTMiddleware
)


# Método que sólo funciona si el jwt es válido
# Se comprueba el token en un middleware
# Lo que venga del middleware añade info a la request.
@private_app.post("/root")
async def post_secured(request: Request):
    user = request.state.user
    return {"message": f"{user.name} never gonna give you up"}


app.mount("/private", private_app)
