from werkzeug.security import generate_password_hash, check_password_hash
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from models import User, db
import os

def register_user(username, email, password):
    if User.query.filter_by(email=email).first():
        return None, "Email already exists"

    hashed = generate_password_hash(password)
    user = User(username=username, email=email, password=hashed)
    db.session.add(user)
    db.session.commit()
    return user, None


def authenticate_user(username, password):
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        return user
    return None


def verify_google_token(token):
    try:
        client_id = os.getenv("GOOGLE_CLIENT_ID")
        return id_token.verify_oauth2_token(token, google_requests.Request(), client_id)
    except:
        return None


def get_or_create_google_user(google_data):
    email = google_data.get("email")
    google_id = google_data.get("sub")
    name = google_data.get("name") or email.split("@")[0]

    user = User.query.filter_by(google_id=google_id).first()
    if user:
        return user

    user = User.query.filter_by(email=email).first()
    if user:
        user.google_id = google_id
        db.session.commit()
        return user

    user = User(email=email, username=name, google_id=google_id)
    db.session.add(user)
    db.session.commit()
    return user
