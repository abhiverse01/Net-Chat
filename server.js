const WebSocket = require('ws');
const kafka = require('kafka-node');
const { KafkaClient, Producer, Consumer } = kafka;

const client = new KafkaClient({ kafkaHost: 'localhost:9092' });

const producer = new Producer(client);
const consumerA = new Consumer(client, [{ topic: 'userA-messages', partition: 0 }], { autoCommit: true });
const consumerB = new Consumer(client, [{ topic: 'userB-messages', partition: 0 }], { autoCommit: true });

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('New client connected.');

    ws.on('message', (message) => {
        console.log(`Received message from client: ${message}`);

        const { sender, recipient, text } = JSON.parse(message);

        const topic = recipient === 'userA' ? 'userA-messages' : 'userB-messages';
        const payloads = [{ topic, messages: text }];
        
        producer.send(payloads, (err, data) => {
            if (err) {
                console.error('Error sending message:', err);
                ws.send(JSON.stringify({ error: 'Message failed to send.' }));
            } else {
                console.log(`Message sent to ${recipient}: ${text}`);
            }
        });
    });

    consumerA.on('message', (message) => {
        console.log(`User A's consumer received: ${message.value}`);
        broadcastMessage({ recipient: 'userA', text: message.value });
    });

    consumerB.on('message', (message) => {
        console.log(`User B's consumer received: ${message.value}`);
        broadcastMessage({ recipient: 'userB', text: message.value });
    });

    ws.on('close', () => {
        console.log('Client disconnected.');
    });
});

function broadcastMessage(message) {
    console.log(`Broadcasting message: ${message.text} to all clients`);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

producer.on('ready', () => {
    console.log('Kafka Producer is ready.');
});

producer.on('error', (err) => {
    console.error('Producer error:', err);
});
