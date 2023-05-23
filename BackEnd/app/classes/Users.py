from app import redis_db

class Users:
    def __init__(self, name, email, password, role):
        self.name = name
        self.email = email
        self.password = password
        self.role = role

    def save(self):
        user_data = {
            'name': self.name,
            'email': self.email,
            'password': self.password,
            'role': self.role
        }
        redis_db.hset('users', self.name, str(user_data))

    @staticmethod
    def get_by_name(name):
        user_data = redis_db.hget('users', name)
        if user_data:
            user = eval(user_data.decode('utf-8'))
            return Users(
                name=user['name'],
                email=user['email'],
                password=user['password'],
                role=user['role']
            )
        else:
            return None

    @staticmethod
    def get_all():
        users_data = redis_db.hvals('users')
        users = []
        for user_data in users_data:
            user = eval(user_data.decode('utf-8'))
            users.append(Users(
                name=user['name'],
                email=user['email'],
                password=user['password'],
                role=user['role']
            ))
        return users

    def delete(self):
        redis_db.hdel('users', self.name)