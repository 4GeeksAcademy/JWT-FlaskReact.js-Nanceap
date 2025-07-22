from flask import request, jsonify, Blueprint
from api.models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS

api = Blueprint('api', __name__)
CORS(api)

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    email = body.get("email", "").strip()
    password = body.get("password", "").strip()

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    if len(password) < 6:
        return jsonify({"msg": "Password must be at least 6 characters"}), 400

    user_exists = User.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({"msg": "Email already exists"}), 400

    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body.get("email", "").strip()
    password = body.get("password", "").strip()

    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({ "access_token": access_token, "msg": "Login successful" }), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def get_private():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({"msg": f"Welcome {user.email}, you are logged in!"}), 200






