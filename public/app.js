const socket = io();
const client = feathers();
client.configure(feathers.hooks());

client.configure(feathers.socketio(socket));

const messages = client.service('messages');

// client.configure(feathers.authentication({
//     storage: window.localStorage
// }));

// client.authenticate({
//     strategy: 'local',

// })

function addMessage(message) {
    const chat = document.querySelector('.chat');

    chat.insertAdjacentHTML('beforeend', `<div>
        <img src="https://placeimg.com/64/64/any" alt="${message.name}" class="avatar">
        <div class="message-wrapper">
            <p class="message-wrapper">
                <scan class="username font=600">${message.name}</scan>
            </p>
            <p class="message-content font-300">${message.text}</p>
        </div>
        </div>`);

    chat.scrollTop = chat.scrollHeight - chat.clientHeight;
}

messages.find().then(page => page.data.forEach(addMessage));

messages.on('created', addMessage);

document.getElementById('send-message').addEventListener('submit', function(ev) {
    const nameInput = document.querySelector('[name="name"]');
    const textInput = document.querySelector('[name="text"]');

    client.service('messages').create({
        name: nameInput.value,
        text: textInput.value
    }).then(() => {
        textInput.value = '';
    });
    ev.preventDefault();
});