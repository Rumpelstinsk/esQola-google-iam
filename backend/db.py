from entities import User

USERS = {
    "jaime.f@landbot.io": {
        "id": 1,
        "password": "test",
        "name": "JaimeF"
    }
}


class UserRepository:
    def get(self, email: str, password: str) -> User:
        user = USERS.get(email)
        if user is None:
            raise Exception("User not found")

        if user.get("password") != password:
            raise Exception("Wrong password")

        return User(id=user.get("id"), name=user.get("name"), email=email)
