import datetime
from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
socketio = SocketIO(app)

chat_history = []


@app.route('/')
def home():
    return render_template('index.html')


@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')


@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('connected', {'message': 'You are connected'})
    emit('chat_history', {'history': chat_history})


@socketio.on('message')
def handle_message(data):
    username = data.get('username')
    message = data.get('message')
    if username and message:
        timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        new_message = {'username': username, 'message': message, 'timestamp': timestamp}
        chat_history.append(new_message)
        emit('message', new_message, broadcast=True)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)

