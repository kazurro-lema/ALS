from flask import Blueprint, jsonify, request
from app import redis_db
from app.classes.Events import Events

import json

events_bp = Blueprint('events', __name__)

@events_bp.route('/events', methods=['GET'])
def get_events():
    events = Events.get_all()
    result = []
    for event in events:
        result.append(event.to_dict_front())
    return jsonify(result)

@events_bp.route('/events', methods=['POST'])
def create_event():
    data = request.json
    event = Events.from_dict_front(data)
    event.save()
    return jsonify(event.to_dict_front()), 201

@events_bp.route('/events/<int:id>', methods=['PUT'])
def update_event(id):
    event_data = redis_db.hget('events', str(id))
    if event_data:
        event = Events.from_dict(json.loads(event_data.decode('utf-8')))
        data = request.json

        event.name = data.get('name', event.name)
        event.description = data.get('description', event.description)
        event.start_date = data.get('startDate', event.start_date)
        event.end_date = data.get('endDate', event.end_date)
        event.author = data.get('author', event.author)
        event.location = data.get('location', event.location)
        event.banned = data.get('banned', event.banned)
        event.ban_description = data.get('ban_description', event.ban_description)

        event.update()

        response = {
            'status': 200,
            'token': None,
            'data': event.to_dict_front()
        }

        return jsonify(response), 200

    response = {
        'message': 'Event not found'
    }
    return jsonify(response), 404

@events_bp.route('/events/<int:id>', methods=['DELETE'])
def delete_event(id):
    event_data = redis_db.hget('events', str(id))
    if event_data:
        event = Events.from_dict(json.loads(event_data.decode('utf-8')))
        event.delete()
        response = {
            'message': 'Event deleted'
        }
        return jsonify(response), 200

    response = {
        'message': 'Event not found'
    }
    return jsonify(response), 404

@events_bp.route('/events/<int:id>', methods=['GET'])
def get_event_by_id(id):
    event_data = redis_db.hget('events', str(id))
    if event_data:
        event = Events.from_dict(json.loads(event_data.decode('utf-8')))
        response = {
            'status': 200,
            'token': None,
            'data': event.to_dict_front()
        }
        return jsonify(response), 200

    response = {
        'message': 'Event not found'
    }
    return jsonify(response), 404