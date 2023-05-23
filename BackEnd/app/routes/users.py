from flask import Blueprint, jsonify, request
from app import redis_db
from app.classes.Users import Users

users_bp = Blueprint('users', __name__)

@users_bp.route('/users', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    user = Users(name=name, email=email, password=password, role='USER')
    user.save()

    response = {
        'status': 200,
        'token': None,
        'data': {
            'name': user.name,
            'email': user.email,
            'password': user.password,
            'role': user.role
        }
    }

    return jsonify(response), 200

@users_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    name = data.get('name')
    password = data.get('password')

    user = Users.get_by_name(name)
    if user and user.password == password:
        response = {
            'status': 200,
            'token': user.role,
            'data': {
                'name': user.name,
                'email': user.email,
                'password': user.password,
                'role': user.role
            }
        }
        return jsonify(response), 200

    response = {
        'status': 400
    }
    return jsonify(response), 200

@users_bp.route('/users', methods=['GET'])
def get_all_users():
    users = Users.get_all()
    user_list = []
    for user in users:
        user_list.append({
            'name': user.name,
            'email': user.email,
            'password': user.password,
            'role': user.role
        })

    return jsonify(user_list), 200

@users_bp.route('/users/<string:name>', methods=['PUT'])
def update_user(name):
    user = Users.get_by_name(name)
    if user:
        data = request.json

        user.email = data.get('email', user.email)
        user.password = data.get('password', user.password)
        user.role = data.get('role', user.role)

        user.save()

        response = {
            'status': 200,
            'token': None,
            'data': {
                'name': user.name,
                'email': user.email,
                'password': user.password,
                'role': user.role
            }
        }

        return jsonify(response), 200

    response = {
        'status': 404,
        'message': 'User not found'
    }

    return jsonify(response), 200

@users_bp.route('/users/<string:name>', methods=['DELETE'])
def delete_user(name):
    user = Users.get_by_name(name)
    if user:
        user.delete()

        response = {
            'status': 200,
            'message': 'User deleted successfully'
        }
        return jsonify(response), 200

    response = {
        'status': 404,
        'message': 'User not found'
    }
    return jsonify(response), 200

@users_bp.route('/users/<string:name>', methods=['GET'])
def get_user_by_id(name):
    user = Users.get_by_name(name)
    if user:
        response = {
            'name': user.name,
            'email': user.email,
            'password': user.password,
            'role': user.role
        }

        return jsonify(response), 200

    response = {
        'status': 404,
        'message': 'User not found'
    }

    return jsonify(response), 200