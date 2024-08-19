# defines the structure of your database tables
# Each class in models.py represents a Table 
# I will use SQLAlchemy to entract with my database using python objects and methods.

######################## imports ########################
from flask_sqlalchemy import SQLAlchemy

######################## code ########################

db = SQLAlchemy() #  enables your application to communicate with the database and utilize ORM features.

######################## Classes ########################
class CodeBlock(db.Model):
    """
    A class that inherits from db.Model which defines the structure of a table
    """
    code_block_id = db.Column(db.Integer, primary_key=True) # id will be the primary key of the table
    title = db.Column(db.String(25), unique=True, nullable=False)
    template = db.Column(db.String(200), unique=True, nullable=False)
    solution = db.Column(db.String(200), unique=True, nullable=False)
    descriptions = db.Column(db.String(200), unique=True, nullable=False)
    task = db.Column(db.String(200), unique=True, nullable=False)

