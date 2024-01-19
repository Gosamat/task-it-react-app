from flask import Blueprint, jsonify, request
from ..database import db
from ..models.task import Task
from ..models.user import User
from ..models.task_list import Task_List
from datetime import date
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager

api = Blueprint('tasks_api', __name__)


##TASK LISTS
# Route to create a task list
@api.route('/create-list', methods=['POST'])
@jwt_required()
def create_task_list():
    list_name = request.form.get('list_name')
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()   

    if not list_name:
        return jsonify(error='list_name is required'), 400

    try:
        new_task_list = Task_List(list_name=list_name, user_id=user.id, created_at=date.today())
        new_task_list.create_list()  # Assuming you have a create_list method in your Task_List model
        return jsonify(message='Task list created successfully', task_list=new_task_list.to_dict()), 201
    except Exception as e:
        return jsonify(error=str(e)), 400
    
# Route to update a task list name
@api.route('/update-list/<int:list_id>', methods=['PUT'])
@jwt_required()
def update_task_list_name(list_id):
    try:
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()

        if not user:
            return jsonify(error='User not found'), 404

        task_list_to_update = Task_List.query.filter_by(id=list_id, user_id=user.id).first()

        if task_list_to_update:
            new_list_name = request.form.get('new_list_name')

            if not new_list_name:
                return jsonify(error='new_list_name is required'), 400

            task_list_to_update.list_name = new_list_name
            db.session.commit()
            return jsonify(message=f'Task list {list_id} name updated successfully'), 200
        else:
            return jsonify(error='Task list not found or does not belong to the current user'), 404

    except Exception as e:
        return jsonify(error=str(e)), 500
    
# Delete a task list
@api.route('/delete-list/<int:list_id>', methods=['DELETE'])
@jwt_required()
def delete_task_list(list_id):
    try:
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()

        if not user:
            return jsonify(error='User not found'), 404

        task_list_to_delete = Task_List.query.filter_by(id=list_id, user_id=user.id).first()

        if task_list_to_delete:
            db.session.delete(task_list_to_delete)
            db.session.commit()
            return jsonify(message=f'Task list {list_id} has been deleted successfully'), 200
        else:
            return jsonify(error='Task list not found or does not belong to the current user'), 404

    except Exception as e:
        return jsonify(error=str(e)), 500


# Route to retrieve a user's task lists and their items
@api.route('/lists', methods=['GET'])
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

###TASKS
# Route to create a task item
@api.route('/create-item', methods=['POST'])
@jwt_required()
def create_task():
    description = request.form.get('description')
    list_id = request.form.get('list_id')

    if not description or not list_id:
        return jsonify(error='Description and list_id are required'), 400

    try:
        # Check if the list belongs to the current user
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()
        task_list = Task_List.query.filter_by(id=list_id, user_id=user.id).first()

        if not task_list:
            return jsonify(error='Task list not found or does not belong to the current user'), 404
        
        new_task = Task(description=description, created_at=date.today(), list_id=list_id)
        db.session.add(new_task)
        print ("ok so far")
        db.session.commit()
        return jsonify(message='Task created successfully', task=new_task.to_dict()), 201
    except Exception as e:
        return jsonify(error=str(e)), 400
    

# Delete a task
@api.route('/delete-item/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    try:
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()

        if not user:
            return jsonify(error='User not found'), 404

        task_to_delete = Task.query.filter_by(id=task_id).first()

        if task_to_delete:
            # Check if the task belongs to the current user
            if task_to_delete.task_list.user_id == user.id:
                db.session.delete(task_to_delete)
                db.session.commit()
                return jsonify(message=f'Task {task_id} has been deleted successfully'), 200
            else:
                return jsonify(error='Task does not belong to the current user'), 403
        else:
            return jsonify(error='Task not found'), 404

    except Exception as e:
        return jsonify(error=str(e)), 500

# Route to update a task item description
@api.route('/update-item/<int:task_id>', methods=['PUT'])
@jwt_required()
def update_task_description(task_id):
    try:
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()

        if not user:
            return jsonify(error='User not found'), 404

        task_to_update = Task.query.filter_by(id=task_id).first()

        if task_to_update:
            # Check if the task belongs to the current user
            if task_to_update.task_list.user_id == user.id:
                new_description = request.form.get('new_description')

                if not new_description:
                    return jsonify(error='new_description is required'), 400

                task_to_update.description = new_description
                db.session.commit()
                return jsonify(message=f'Task {task_id} description updated successfully'), 200
            else:
                return jsonify(error='Task does not belong to the current user'), 403
        else:
            return jsonify(error='Task not found'), 404

    except Exception as e:
        return jsonify(error=str(e)), 500


##Internal test routes
    
 # Route to get all task lists
@api.route('/task-lists', methods=['GET'])
def get_all_task_lists():
    task_lists = Task_List.query.all()
    result = [list.to_dict() for list in task_lists]
    return jsonify({"Current Lists": result})
