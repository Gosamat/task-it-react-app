from flask import Flask
from app.config import Config
from flask_migrate import Migrate
from app.database import db


def create_app():
    app = Flask(__name__)

    app.config.from_mapping(
        SECRET_KEY = "My_Secret_Key"
    )  

    app.config.from_object(Config)   

     
    # Database related part
    db.init_app(app)
    from app.models.user import User
    from app.models.task_list import Task_List
    from app.models.task import Task
    migrate = Migrate(app, db)

    # Routes
    from .routes import api
    app.register_blueprint(api, url_prefix='/api')

    return app