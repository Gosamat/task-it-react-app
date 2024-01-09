from flask import Blueprint, jsonify, request
from .database import db
from .models.task import Task
from .models.user import User
from .models.task_list import Task_List
from datetime import date

api = Blueprint('api', __name__)



##USERS
# Route to create a user
@api.route('/users', methods=['POST'])
def create_user():
    username = request.form.get('username')

    if not username:
        return jsonify(error='Username is required'), 400

    try:
        new_user = User(username=username, created_at=date.today())  # Assuming you have a 'created_at' field in your User model
        new_user.register_user_if_not_exist()  # Assuming you have a register_user_if_not_exist method in your User model
        return jsonify(message='User created successfully'), 201
    except Exception as e:
        return jsonify(error=str(e)), 400
    
# Route to get all users
@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    user_list = [user.to_dict() for user in users]
    return jsonify({"users": user_list})

##TASK LISTS
# Route to create a task list
@api.route('/task-lists', methods=['POST'])
def create_task_list():
    list_name = request.form.get('list_name')
    user_id = request.form.get('user_id')

    if not list_name or not user_id:
        return jsonify(error='Both list_name and user_id are required'), 400

    try:
        new_task_list = Task_List(list_name=list_name, user_id=user_id, created_at=date.today())
        new_task_list.create_list()  # Assuming you have a create_list method in your Task_List model
        return jsonify(message='Task list created successfully', task_list=new_task_list.to_dict()), 201
    except Exception as e:
        return jsonify(error=str(e)), 400
    
# Route to get all task lists
@api.route('/task-lists', methods=['GET'])
def get_all_task_lists():
    task_lists = Task_List.query.all()
    result = [list.to_dict() for list in task_lists]
    return jsonify({"Current Lists": result})
