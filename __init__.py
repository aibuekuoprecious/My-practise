# RecomMix/app/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configure the MySQL database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/db_name'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db = SQLAlchemy(app)

# ... (other configurations)
