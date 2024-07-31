const kafka = require('kafka-node');
const { KafkaClient, Producer, Consumer } = kafka;
const readline = require('readline');

const client = new KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);
const consumer = new Consumer(client, [{ topic: 'userB-messages', partition: 0 }], { autoCommit: true });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

producer.on('ready', () => {
    console.log('User B is ready to send and receive messages.\n');

    const sendMessage = (message) => {
        const payloads = [{ topic: 'userA-messages', messages: message }];
        producer.send(payloads, (err, data) => {
            if (err) console.error('Error sending message:', err);
            else console.log(`\x1b[32m[Sent to User A]: ${message}\x1b[0m`);
        });
    };

    const askForMessage = () => {
        rl.question('User B, enter a message to send to User A: ', (message) => {
            sendMessage(message);
            askForMessage();
        });
    };

    askForMessage();
});

consumer.on('message', (message) => {
    console.log(`\x1b[34m[Received from User A]: ${message.value}\x1b[0m`);
});

producer.on('error', (err) => {
    console.error('Producer error:', err);
});

consumer.on('error', (err) => {
    console.error('Consumer error:', err);
});
