from app.database import db

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    description = db.Column(db.String(), unique=True, nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    list_id = db.Column(db.Integer, nullable=False) 

    def __init__(self, description, created_at, list_id):
        self.description = description
        self.created_at = created_at
        self.list_id = list_id

    def __repr__(self):
        return f'<task {self.description}>'