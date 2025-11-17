from flask import Flask, make_response
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from models import db
from routes import api

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    # --- FIXED CORS ---
    CORS(
        app,
        resources={r"/*": {"origins": "*"}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        expose_headers=["Authorization"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    )

    JWTManager(app)

    app.register_blueprint(api, url_prefix="/api")

    with app.app_context():
        db.create_all()

    # --- CRITICAL: HANDLE OPTIONS ---
    @app.route("/api/<path:path>", methods=["OPTIONS"])
    def options_handler(path):
        response = make_response()
        response.status_code = 200
        return response

    @app.after_request
    def add_cors_headers(response):
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        return response

    @app.route("/")
    def home():
        return {"message": "Backend Running"}

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(port=5000, debug=True)
