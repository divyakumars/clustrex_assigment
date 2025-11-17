from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120))
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))      # null for Google users
    google_id = db.Column(db.String(255))     # Google unique ID
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer)
    title = db.Column(db.String(255))
    price = db.Column(db.Float)
    quantity = db.Column(db.Integer)
    total = db.Column(db.Float)
    discount_percentage = db.Column(db.Float)
    discounted_total = db.Column(db.Float)
    thumbnail = db.Column(db.String(500))

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "title": self.title,
            "price": self.price,
            "quantity": self.quantity,
            "total": self.total,
            "discount_percentage": self.discount_percentage,
            "discounted_total": self.discounted_total,
            "thumbnail": self.thumbnail
        }
