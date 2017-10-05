const socket = io();
const client = feather();
cllient.configure(feathers.hooks());

client.configure(featehrs.socketio(socket));

const messages = client.service('messages');

messages.on('created', message =>
    alert(`New Message from ${message.name}: ${message.text}`)
);

messages.create({
    name: 'Test User',
    text: 'Hello World!'
});

messages.find().then(page => console.log('Current Messages are', page));