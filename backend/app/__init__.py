from flask import Flask
from app.config import Config
from flask_migrate import Migrate
from app.database import db
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

load_dotenv()

def create_app():

    try:
        app = Flask(__name__)

        app.config.from_mapping(
        SECRET_KEY = "My_Secret_Key"
         )  

        app.config.from_object(Config)   

        jwt = JWTManager(app)


     
        # Database related part
        db.init_app(app)
        from app.models.user import User
        from app.models.task_list import Task_List
        from app.models.task import Task
        migrate = Migrate(app, db)

        # Routes
        from app.routes.tasks_routes import api as tasks_api
        app.register_blueprint(tasks_api, url_prefix='/api/tasks')

        from app.routes.user_routes import api as users_api
        app.register_blueprint(users_api, url_prefix='/api/users')

    except Exception as e:
        print(f"Error during app initialization: {str(e)}")
        raise e

    return app