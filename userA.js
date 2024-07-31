const kafka = require('kafka-node');
const { KafkaClient, Producer, Consumer } = kafka;
const readline = require('readline');

const client = new KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);
const consumer = new Consumer(client, [{ topic: 'userA-messages', partition: 0 }], { autoCommit: true });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

producer.on('ready', () => {
    console.log('User A is ready to send and receive messages.\n');

    const sendMessage = (message) => {
        const payloads = [{ topic: 'userB-messages', messages: message }];
        producer.send(payloads, (err, data) => {
            if (err) console.error('Error sending message:', err);
            else console.log(`\x1b[32m[Sent to User B]: ${message}\x1b[0m`);
        });
    };

    const askForMessage = () => {
        rl.question('User A, enter a message to send to User B: ', (message) => {
            sendMessage(message);
            askForMessage();
        });
    };

    askForMessage();
});

consumer.on('message', (message) => {
    console.log(`\x1b[34m[Received from User B]: ${message.value}\x1b[0m`);
});

producer.on('error', (err) => {
    console.error('Producer error:', err);
});

consumer.on('error', (err) => {
    console.error('Consumer error:', err);
});
