from flask import Blueprint, jsonify, request
from ..database import db
from ..models.task import Task
from ..models.user import User
from ..models.task_list import Task_List
from datetime import date
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager

api = Blueprint('tasks_api', __name__)

# Route to retrieve a user's task lists and their items
@api.route('/users/task-lists', methods=['GET'])
@jwt_required()
def get_user_task_lists():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()    

    if not user:
        return jsonify(error=f'User with ID {user.id} not found'), 404

    task_lists = Task_List.query.filter_by(user_id=user.id).all()
    user_task_lists = []

    for task_list in task_lists:
        tasks = Task.query.filter_by(list_id=task_list.id).all()
        task_list_info = task_list.to_dict()
        task_list_info['tasks'] = [task.to_dict() for task in tasks]
        user_task_lists.append(task_list_info)

    return jsonify({"user_task_lists": user_task_lists})

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


###TASKS
# Route to create a task
@api.route('/tasks', methods=['POST'])
def create_task():
    description = request.form.get('description')
    list_id = request.form.get('list_id')

    if not description or not list_id:
        return jsonify(error='Description and list_id are required'), 400

    try:
        new_task = Task(description=description, created_at=date.today(), list_id=list_id)
        db.session.add(new_task)
        db.session.commit()
        return jsonify(message='Task created successfully', task=new_task.to_dict()), 201
    except Exception as e:
        return jsonify(error=str(e)), 400
