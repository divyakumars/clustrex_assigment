import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = 3600

    GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

    CORS_ORIGINS = [
        "http://localhost:5173",
        "http://localhost:3000"
    ]
