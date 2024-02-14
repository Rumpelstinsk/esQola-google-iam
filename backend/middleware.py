from fastapi.openapi.models import Response
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint

from constants import JWT_COOKIE_NAME
from jwt_utils import decode_jwt_token
from fastapi import Request, HTTPException


class ValidateJWTMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)

    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        print("estoy en el middleware!!!!!!")
        jwt_token = request.cookies.get(JWT_COOKIE_NAME)
        if jwt_token is None:
            raise HTTPException(status_code=404, detail="YOU SHALL NOT PASS!!")

        print("a ver que pasa")
        request.state.user = decode_jwt_token(jwt_token)
        print(request.state.user)
        return await call_next(request)


