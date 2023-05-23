from app import redis_db

import json

class Attendees:
    def __init__(self, num, name):
        self.num = num
        self.name = name

    def to_dict(self):
        return {
            'num': self.num,
            'name': self.name
        }

    @classmethod
    def from_dict(cls, data):
        return Attendees(
            num=data.get('num'),
            name=data.get('name')
        )
    
    @classmethod
    def get_by_num_and_name(cls, num, name):
        key = f"attendee:{num}:{name}"
        attendee_data = redis_db.hgetall(key)
        if attendee_data:
            return Attendees(int(attendee_data[b'num']), attendee_data[b'name'].decode('utf-8'))
        return None

    @staticmethod
    def get_all():
        attendees = []
        keys = redis_db.keys("attendee:*")
        for key in keys:
            attendee_data = redis_db.hgetall(key)
            num = int(attendee_data[b'num'])
            name = attendee_data[b'name'].decode('utf-8')
            attendee = Attendees(num, name)
            attendees.append(attendee)
        return attendees

    def save(self):
        key = f"attendee:{self.num}:{self.name}"
        redis_db.hmset(key, {"num": self.num, "name": self.name})

    def delete(self):
        key = f"attendee:{self.num}:{self.name}"
        redis_db.delete(key)