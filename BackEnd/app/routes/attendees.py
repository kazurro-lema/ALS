from flask import Blueprint, jsonify, request
from app import redis_db
from app.classes.Attendees import Attendees

import json

attendees_bp = Blueprint('attendees', __name__)

@attendees_bp.route('/attendees', methods=['GET'])
def get_all_attendees():
    attendees = Attendees.get_all()
    attendee_list = []
    for attendee in attendees:
        attendee_list.append({
            'num': attendee.num,
            'name': attendee.name
        })
    return jsonify(attendee_list), 200

@attendees_bp.route('/attendees', methods=['POST'])
def crear():
    data = request.json
    attendee = Attendees(num=data.get('num'), name=data.get('name'))
    attendee.save()

    response = {
        'status': 200,
        'data': {
            'num': attendee.num,
            'name': attendee.name
        }
    }

    return jsonify(response), 200

@attendees_bp.route('/attendees/<int:num>/<string:name>', methods=['DELETE'])
def delete_user(num, name):
    attendee = Attendees.get_by_num_and_name(num, name)
    if attendee is None:
        response = {
            'status': 404,
            'message': 'Attendee not found'
        }
        return jsonify(response), 200

    attendee.delete()

    response = {
        'status': 200,
        'message': 'Attendee deleted successfully',
        'data': {
            'num': attendee.num,
            'name': attendee.name
        }
    }

    return jsonify(response), 200

@attendees_bp.route('/attendees/<int:num>/<string:name>', methods=['GET'])
def get(num, name):
    attendee = Attendees.get_by_num_and_name(num, name)
    if attendee is None:
        response = {
            'status': 404,
            'message': 'Attendee not found'
        }
        return jsonify(response), 200
    
    response = {
        'status': 200,
        'token': None,
        'data': {
            'num': attendee.num,
            'name': attendee.name
        }
    }

    return jsonify(response), 200