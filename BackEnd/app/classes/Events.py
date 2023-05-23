from app import redis_db

import json

class Events:
    def __init__(self, name, description, start_date, end_date, author, location, banned=False, ban_description=''):
        self.id = redis_db.incr('events:counter')
        self.name = name
        self.description = description
        self.start_date = start_date
        self.end_date = end_date
        self.author = author
        self.location = location
        self.banned = banned
        self.ban_description = ban_description

    def __init__(self, id, name, description, start_date, end_date, author, location, banned=False, ban_description=''):
        self.id = id
        self.name = name
        self.description = description
        self.start_date = start_date
        self.end_date = end_date
        self.author = author
        self.location = location
        self.banned = banned
        self.ban_description = ban_description

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'start_date': str(self.start_date),
            'end_date': str(self.end_date),
            'author': self.author,
            'location': self.location,
            'banned': self.banned,
            'ban_description': self.ban_description
        }
    
    def to_dict_front(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'startDate': str(self.start_date),
            'endDate': str(self.end_date),
            'author': self.author,
            'location': self.location,
            'banned': self.banned,
            'ban_description': self.ban_description
        }

    @classmethod
    def from_dict(cls, data):
        return Events(
            id=data.get('id'),
            name=data.get('name'),
            description=data.get('description'),
            start_date=data.get('start_date'),
            end_date=data.get('end_date'),
            author=data.get('author'),
            location=data.get('location'),
            banned=data.get('banned', False),
            ban_description=data.get('ban_description', '')
        )
    
    @classmethod
    def from_dict_front(cls, data):
        return Events(
            id=data.get('id', redis_db.incr('events:counter')),
            name=data.get('name'),
            description=data.get('description'),
            start_date=data.get('startDate'),
            end_date=data.get('endDate'),
            author=data.get('author'),
            location=data.get('location'),
            banned=data.get('banned', False),
            ban_description=data.get('ban_description', '')
        )

    @staticmethod
    def get_all():
        events = []
        event_keys = redis_db.hkeys('events')
        for key in event_keys:
            event_data = redis_db.hget('events', key)
            event_data = json.loads(event_data.decode('utf-8'))
            event = Events.from_dict(event_data)
            events.append(event)
        return events

    def save(self):
        event_data = self.to_dict()
        redis_db.hset('events', self.id, json.dumps(event_data))

    def update(self):
        event_data = self.to_dict()
        redis_db.hset('events', self.id, json.dumps(event_data))

    def delete(self):
        redis_db.hdel('events', self.id)
