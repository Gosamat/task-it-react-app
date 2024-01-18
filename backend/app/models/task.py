from app.database import db
from sqlalchemy.ext.hybrid import hybrid_property
from cryptography.fernet import Fernet
import os

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    description = db.Column(db.String(), unique=True, nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    list_id = db.Column(db.Integer, nullable=False) 
    description_encrypted = db.Column(db.LargeBinary, nullable=False)


    task_key = os.getenv("TASK_ENCRYPTION_KEY")

    def __init__(self, description, created_at, list_id):
        self.created_at = created_at
        self.list_id = list_id
        self.description_encrypted = self.encrypt_description(description)

    def __repr__(self):
        return f'<task {self.description}>'
    
    def to_dict(self):
        return {
            "Task ID": self.id,
            "description": self.description,
            "list ID": self.list_id,
            "Create at": self.created_at
        }
    
    @hybrid_property
    def description(self):
        return self.decrypt_description(self.description_encrypted)

    @staticmethod
    def encrypt_description(description):
        cipher_suite = Fernet(Task.task_key)
        return cipher_suite.encrypt(description.encode())

    @staticmethod
    def decrypt_description(encrypted_description):
        cipher_suite = Fernet(Task.task_key)
        return cipher_suite.decrypt(encrypted_description).decode()