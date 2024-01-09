from app.database import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(), unique=True, nullable=False)    
    created_at = db.Column(db.Date, nullable=False) 

    def __init__(self, username, created_at, ):
        self.username = username        
        self.created_at = created_at        
    
    def register_user_if_not_exist(self):        
        db_user = User.query.filter(User.username == self.username).all()
        if not db_user:
            db.session.add(self)
            db.session.commit()
        
        return True
    
    def to_dict(self):
        return {
            "Username": self.username,
            "Created at": self.created_at,
            "User Id": self.id
        }

    def get_by_username(username):        
        db_user = User.query.filter(User.username == username).first()
        return db_user

    def __repr__(self):
        return f"<User {self.username}>"