from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from models import Product, User, db
from auth import register_user, authenticate_user, verify_google_token, get_or_create_google_user

api = Blueprint("api", __name__)

# ============================================================
#                       AUTH ROUTES
# ============================================================

# ---------------- Register ----------------
@api.route("/auth/register", methods=["POST"])
def register():
    data = request.json
    user, err = register_user(data["username"], data["email"], data["password"])
    if err:
        return jsonify({"error": err}), 400

    token = create_access_token(identity=str(user.id))
    return jsonify({"token": token, "user": user.to_dict()}), 201


# ---------------- Login ----------------
@api.route("/auth/login", methods=["POST"])
def login():
    data = request.json
    user = authenticate_user(data["username"], data["password"])
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({"token": token, "user": user.to_dict()}), 200


# ---------------- Google Login ----------------
@api.route("/auth/google", methods=["POST"])
def google_login():
    data = request.json
    google_token = data.get("token")

    google_data = verify_google_token(google_token)
    if not google_data:
        return jsonify({"error": "Invalid Google token"}), 401

    user = get_or_create_google_user(google_data)
    access_token = create_access_token(identity=str(user.id))

    return jsonify({"token": access_token, "user": user.to_dict()}), 200


# ============================================================
#                       PRODUCT ROUTES
# ============================================================

# ---------- GET ALL PRODUCTS ----------
@api.route("/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify({
        "products": [p.to_dict() for p in products]
    }), 200


# ---------- GET SINGLE PRODUCT ----------
@api.route("/products/<int:product_id>", methods=["GET"])
def get_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product.to_dict()), 200


# ---------- CREATE PRODUCT ----------
@api.route("/products", methods=["POST"])
def create_product():
    data = request.json

    price = float(data.get("price", 0))
    quantity = int(data.get("quantity", 1))

    discounted_percentage = float(data.get("discount_percentage", 0))
    total = price * quantity
    discounted_total = total * (1 - discounted_percentage / 100)

    new_product = Product(
        product_id=data.get("product_id"),
        title=data.get("title"),
        price=price,
        quantity=quantity,
        total=total,
        discount_percentage=discounted_percentage,
        discounted_total=discounted_total,
        thumbnail=data.get("thumbnail", "")
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify(new_product.to_dict()), 201


# ---------- UPDATE PRODUCT ----------
@api.route("/products/<int:product_id>", methods=["PUT"])
def update_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    data = request.json

    product.title = data.get("title", product.title)
    product.price = float(data.get("price", product.price))
    product.quantity = int(data.get("quantity", product.quantity))

    # recalc totals
    product.total = product.price * product.quantity
    product.discount_percentage = float(data.get("discount_percentage", product.discount_percentage))
    product.discounted_total = product.total * (1 - product.discount_percentage / 100)

    product.thumbnail = data.get("thumbnail", product.thumbnail)

    db.session.commit()
    return jsonify(product.to_dict()), 200


# ---------- DELETE PRODUCT ----------
@api.route("/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted"}), 200


# ============================================================
#                       ANALYTICS ROUTE
# ============================================================

@api.route("/analytics", methods=["GET"])
def analytics():
    products = Product.query.all()
    if not products:
        return jsonify({"error": "No products found"}), 404

    total_before_discount = sum(p.total for p in products)
    total_after_discount = sum(p.discounted_total for p in products)
    average_discount = sum(p.discount_percentage for p in products) / len(products)

    most_expensive = max(products, key=lambda p: p.price)
    cheapest = min(products, key=lambda p: p.price)
    highest_discount = max(products, key=lambda p: p.discount_percentage)

    return jsonify({
        "total_before_discount": total_before_discount,
        "total_after_discount": total_after_discount,
        "average_discount_percentage": average_discount,
        "most_expensive_product": most_expensive.to_dict(),
        "cheapest_product": cheapest.to_dict(),
        "highest_discount_product": highest_discount.to_dict(),
        "total_quantity": sum(p.quantity for p in products),
        "unique_products": len(products)
    }), 200
