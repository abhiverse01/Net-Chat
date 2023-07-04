document.addEventListener('DOMContentLoaded', (event) => {
    let modal = document.getElementById('usernameModal');
    modal.style.display = "block";

    let usernameForm = document.getElementById('usernameForm');
    usernameForm.addEventListener('submit', function(e) {
        e.preventDefault();
        username = document.getElementById('usernameInput').value.trim();

        if (username !== '') {
            modal.style.display = "none";
            socket.emit('username', {'username': username});
        }
    });
});

const socket = io();
let username = '';

document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();

    if (message === '') {
        return;
    }

    socket.emit('message', {'username': username, 'message': message});
    messageInput.value = '';
});

socket.on('message', function(data) {
    const messageList = document.getElementById('message-list');
    const messageItem = document.createElement('div');
    messageItem.classList.add('chat-message');

    if (data.username === username) {
        messageItem.innerHTML = `
            <div class="media w-50 ml-auto mb-3">
                <div class="media-body">
                    <div class="bg-primary rounded py-2 px-3 mb-2">
                        <p class="text-small mb-0 text-white">${data.message}</p>
                    </div>
                    <p class="small text-muted">${data.timestamp}</p>
                </div>
            </div>
        `;
    } else {
        messageItem.innerHTML = `
            <div class="media w-50 mb-3">
                <div class="media-body ml-3">
                    <div class="bg-light rounded py-2 px-3 mb-2">
                        <p class="text-small mb-0">${data.message}</p>
                    </div>
                    <p class="small text-muted">${data.timestamp} | <a href="#" class="text-small">${data.username}</a></p>
                </div>
            </div>
        `;
    }

    messageList.appendChild(messageItem);
    messageList.scrollTop = messageList.scrollHeight;
});

socket.on('chat_history', function(data) {
    const messageList = document.getElementById('message-list');
    data.history.forEach(function(message) {
        const messageItem = document.createElement('div');
        messageItem.classList.add('chat-message');

        if (message.username === username) {
            messageItem.innerHTML = `
                <div class="media w-50 ml-auto mb-3">
                    <div class="media-body">
                        <div class="bg-primary rounded py-2 px-3 mb-2">
                            <p class="text-small mb-0 text-white">${message.message}</p>
                        </div>
                        <p class="small text-muted">${message.timestamp}</p>
                    </div>
                </div>
            `;
        } else {
            messageItem.innerHTML = `
                <div class="media w-50 mb-3">
                    <div class="media-body ml-3">
                        <div class="bg-light rounded py-2 px-3 mb-2">
                            <p class="text-small mb-0">${message.message}</p>
                        </div>
                        <p class="small text-muted">${message.timestamp} | <a href="#" class="text-small">${message.username}</a></p>
                    </div>
                </div>
            `;
        }

        messageList.appendChild(messageItem);
    });

    messageList.scrollTop = messageList.scrollHeight;
});

socket.on('connected', function(data) {
    console.log(data.message);
    getUsername();
});

function getUsername() {
    username = prompt('Enter your username:');
    if (!username || username.trim() === '') {
        getUsername();
    } else {
        socket.emit('username', {'username': username});
    }
}
