from app.database import db
from app.models.user import User
from sqlalchemy import ForeignKeyConstraint

class Task_List(db.Model):
    __tablename__ = 'task_lists'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    list_name = db.Column(db.String(), unique=True, nullable=False)    
    created_at = db.Column(db.Date, nullable=False) 
    user_id = db.Column(db.Integer, nullable=False)

    __table_args__ = (        
        ForeignKeyConstraint([user_id], [User.id], ondelete='NO ACTION'),        
    )

    def __init__(self, list_name, created_at, user_id ):
        self.list_name = list_name        
        self.created_at = created_at        
        self.user_id = user_id 
    
    def to_dict(self):
        return {
            "List Name": self.list_name,
            "User": self.user_id,
            "Create at": self.created_at
        }
    
    def create_list(self):
        record = Task_List.query.filter(Task_List.id == self.id).first()
        if not record:
            db.session.add(self)
            db.session.commit()
        
        return True

    
    def get_by_list_name(list_name):        
        db_user = Task_List.query.filter(Task_List.list_name == list_name).first()
        return db_user

    def __repr__(self):
        return f"<List {self.list_name}>"