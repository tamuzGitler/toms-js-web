######################## installs ########################
# backend
# pip install -U Flask-SQLAlchemy
# pip install  Flask-SocketIO		
# pip install Flask  
# pip install Flask-Cors

# front
# npm create vite@latest
# install npm
# npm install react-router-dom
# npm run dev - to run front 
# npm install socket.io-client
# npm install react-simple-code-editor prismjs
# npm install lodash


######################## imports ########################
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify # takes Python data structures and converts them into JSON format
# from flask_socketio import SocketIO, emit, join_room, leave_room
from flask import Flask, render_template
from collections import defaultdict
from flask import request 
from flask import send_from_directory
import os
from models import db, CodeBlock 
from flask_cors import CORS
from collections import defaultdict
from socket_handler import SocketIOHandler
from jsCodeExamples import TITLES,TEMPLATES, SOLUTIONS, DESCRIPTIONS, TASKS
import shutil

######################## Constants ########################

def copy_database_to_tmp():
    """
    Copies the SQLite database from the project directory to Railway's ephemeral file system.
    """
    src_path = 'database/code_blocks_table.db'  # Assuming your database is in the backend folder
    tmp_dir = '/tmp'  # Railway's ephemeral file system directory
    dest_path = os.path.join(tmp_dir, 'code_blocks_table.db')

    if not os.path.exists(tmp_dir):
        os.makedirs(tmp_dir)

    shutil.copy2(src_path, dest_path)

    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{dest_path}'
    


######################## code ########################
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
copy_database_to_tmp()
db.init_app(app)
# CORS(app, resources={r"/api/*": {"origins": "*"}})
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

socketio_handler = SocketIOHandler(app)

######################## server requests ########################
# # not in used
# @app.route('/')
# def hello():
#     return "Hello, World!"

@app.route('/get_buttons_names')
def handle_get_buttons():
    print("user entered lobby")
    query = CodeBlock.query.with_entities(CodeBlock.code_block_id, CodeBlock.title).order_by(CodeBlock.code_block_id)
    blocks = query.all() # fetches all the rows that match your query
    data = [{"code_block_id":cb.code_block_id, "title": cb.title} for cb in blocks]
    return jsonify(data)


@app.route('/codeblocks/<int:code_block_id>')  # captures the ID from the URL
def get_code_block_data(code_block_id):
    """
    returns inital data
    """
    print("Getting offline code block data")

    code_block = CodeBlock.query.get(code_block_id)
    if code_block:
        return jsonify({
            'title': code_block.title,
            'description': code_block.descriptions,
            'task': code_block.task 
        })
    else:
        return jsonify({"error": "Code block not found"}), 404


######################## fill db ########################
with app.app_context(): 
    db.create_all() # create the corresponding tables in your database.
    if CodeBlock.query.count() == 0:
        try:
            for i in range(len(TEMPLATES)):
                new_code_block = CodeBlock(title=TITLES[i], 
                                            template=TEMPLATES[i], 
                                            solution=SOLUTIONS[i], 
                                            descriptions=DESCRIPTIONS[i],
                                            task=TASKS[i])
                db.session.add(new_code_block)
            db.session.commit()
        except Exception as e:
            print(f"Error populating database: {e}")
            db.session.rollback()  # Roll back changes in case of an error


if __name__ == '__main__':
    socketio_handler.run(app)
