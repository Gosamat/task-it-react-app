from flask import Blueprint, jsonify, request
from ..database import db
from ..models.user import User
from datetime import date
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager

api = Blueprint('users_api', __name__)


##ROUTES
#create a user
@api.route('/create', methods=['POST'])
def create_user():
    username = request.form.get('username')
    password = request.form.get('password')

    if not username or not password:
        return jsonify(error='Username and password are both required'), 400

    try:
        existing_user = User.get_by_username(username)
        if existing_user:
            return jsonify(error=f'Username {username} is already taken. Please choose another username.'), 400


        new_user = User(username=username, created_at=date.today(), password=password)
        new_user.register_user_if_not_exist() 


        return jsonify(message='User created successfully'), 201
    except Exception as e:
        return jsonify(error=str(e)), 400
    

#Login a user
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    print(username, password)

    if not username or not password:
        return jsonify(error='Username and password are both required'), 400

    user = User.get_by_username(username)

    if user and user.check_password(password):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify(error='Invalid username or password'), 401
    

#Logout a user
@api.route('/logout', methods=['POST'])
@jwt_required()
def logout():

    current_user = get_jwt_identity()

    return jsonify(message=f'{current_user} has logged out successfully'), 200    

#Delete a user
@api.route('/delete', methods=['DELETE'])
@jwt_required()
def delete_user():
    try:
        current_user = get_jwt_identity()
        user_to_delete = User.query.filter_by(username=current_user).first()

        if user_to_delete:
            db.session.delete(user_to_delete)
            db.session.commit()
            return jsonify(message=f'User {current_user} has been deleted successfully'), 200
        else:
            return jsonify(error='User not found'), 404

    except Exception as e:
        return jsonify(error=str(e)), 500
    
# Route to get user information from the token
@api.route('/userinfo', methods=['GET'])
@jwt_required()
def get_user_info():
    current_user = get_jwt_identity()
    user = User.get_by_username(current_user)
    if user:
        return jsonify(user.to_dict()), 200
    else:
        return jsonify(error='User not found'), 404



##Internal test Routes
#Get all users
@api.route('/', methods=['GET'])
def get_all_users():
    users = User.query.all()
    user_list = [user.to_dict() for user in users]
    return jsonify({"users": user_list})