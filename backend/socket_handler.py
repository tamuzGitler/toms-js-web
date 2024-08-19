from flask_socketio import SocketIO, emit, join_room, leave_room, rooms
from flask import request
from models import CodeBlock
import uuid

class SocketIOHandler:
    def __init__(self, app) -> None:
        self.rooms = {}
        self.socketio = SocketIO(app, cors_allowed_origins="*")
        self.socketio.on_event('connect', self.handle_on_connect)
        self.socketio.on_event('join_room', self.handle_join_room)
        self.socketio.on_event('userLeft', self.handle_user_left_room)
        self.socketio.on_event('code_updated', self.handle_code_update)
        self.are_equal = lambda s1, s2: s1.strip() == s2.strip()



    def run(self,app):
        """
        Runs the Socket.IO server.
        """
        self.socketio.run(app)


    def handle_user_left_room(self,data):
        user_id = data['user_id']  # Get the user's session ID
        room_id = data["code_block_id"]

        print('user disconnected with id ' + user_id)
        if self.rooms[room_id]['mentor_id'] == user_id:
            emit('redirect_to_lobby', {}, to=room_id)
            print("mentor leaving: redirecting clients to loby")
            del self.rooms[room_id]

        elif user_id in self.rooms[room_id]['users']:
            print("student leaving")
            self.rooms[room_id]['users'].remove(user_id)
            emit('student_count_update', {'studentCounter': len(self.rooms[room_id]['users']) - 1}, room=room_id)
        else:
            print('f{user_id} already left session')
        leave_room(room_id)




    def handle_on_connect(self):
        # Attempt to retrieve existing user_id from localStorage (sent in the connection request headers)
        existing_user_id = request.headers.get('user_id')  
        print(existing_user_id)
        if existing_user_id:
            # Optionally, add validation to ensure the user_id is valid (e.g., check against a database)
            user_id = existing_user_id
            print(f"Existing user reconnected with user_id: {user_id}")
        else:
            user_id = str(uuid.uuid4())  # Generate new user id only if not provided
            print(f"New user connected with user_id: {user_id}")
            emit('store_user_id', {'user_id': user_id})
    
    def handle_join_room(self,data):
        print("joined room handling")
        room_id = data["code_block_id"]
        user_sid = data['user_id']  # Get the user's session ID

        room_ids = list(self.rooms.keys())  # Get a list of all room_ids
        first_room_id = room_ids[0] if room_ids else None  # Get the first room_id, or None if there are no rooms
        if first_room_id != None and first_room_id != room_id:
            emit('mentor_already_in_another_room', {}, to=request.sid) 

        else:
            # Check if the room exists in dictionary
            if room_id not in self.rooms:
                # Fetch the template code from the database
                code_block = CodeBlock.query.get(room_id)
                self.rooms[room_id] = {'code': code_block.template, 'users': set(),'mentor_id':user_sid}
                
            # Add user to the room        
            self.rooms[room_id]['users'].add(user_sid)
            role = 'mentor' if len(self.rooms[room_id]['users']) == 1 else 'student' # Determine role by number of users
            emit('initial_data', {
                'role': role,
                'code': self.rooms[room_id]['code'], 
                'studentCounter': len(self.rooms[room_id]['users']) - 1 # -1 - because mentor is also a user!
            })
            
            # inform all the existing participants in the room that a new student has joined, update their student counter display
            emit('student_count_update', {'studentCounter': len(self.rooms[room_id]['users']) - 1}, room=room_id)
            join_room(room_id)

    

    def handle_code_update(self,data):
        print(f'new code recived {data}')

        room_id = data['code_block_id']
        new_code = data['code']

        # Update the code in your room data structure
        if room_id in self.rooms:
            self.rooms[room_id]['code'] = new_code

            # Broadcast the updated code to all clients in the room (except the sender)
            emit('code_update', {'code': new_code, 'code_block_id': room_id}, room=room_id)
            code_block = CodeBlock.query.get(room_id)
            # print(len(code_block.solution))
            # print(code_block.solution)
            # print(len(new_code))
            # print(new_code)

            if self.are_equal(code_block.solution, new_code):
                emit('problem_solved', {}, room=room_id)