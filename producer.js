const kafka = require('kafka-node');
const { KafkaClient, Producer } = kafka;

const client = new KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

producer.on('ready', () => {
    console.log('Producer is ready');

    const sendMessage = (topic, message) => {
        const payloads = [{ topic: topic, messages: message }];
        producer.send(payloads, (err, data) => {
            if (err) console.error('Error sending message:', err);
            else console.log('Message sent:', data);
        });
    };

    // Example usage
    sendMessage('userA-messages', 'Hello from User B!');
});

producer.on('error', (err) => {
    console.error('Producer error:', err);
});
