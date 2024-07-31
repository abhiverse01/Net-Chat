const kafka = require('kafka-node');
const { KafkaClient, Consumer } = kafka;

const client = new KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new Consumer(client, [{ topic: 'userA-messages', partition: 0 }], { autoCommit: true });

consumer.on('message', (message) => {
    console.log('Received message:', message.value);
});

consumer.on('error', (err) => {
    console.error('Consumer error:', err);
});
