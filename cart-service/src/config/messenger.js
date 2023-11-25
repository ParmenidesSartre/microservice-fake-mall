const amqplib = require("amqplib");

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

let connection;
const replyQueue = "cart-service";

const getConnection = async () => {
  if (connection) return connection;
  connection = await amqplib.connect(RABBITMQ_URL);
  return connection;
};

const listenForRequests = async () => {
  const connection = await getConnection();
  const channel = await connection.createChannel();
  await channel.assertQueue(replyQueue, { durable: true });
  return new Promise((resolve, reject) => {
    channel.consume(
      replyQueue,
      (msg) => {
        const response = JSON.parse(msg.content.toString());
        resolve(response);
      },
      { noAck: true }
    );
  });
};

const sendRequest = async (queue, request, correlationId) => {
  const connection = await getConnection();
  const channel = await connection.createChannel();
  channel.sendToQueue(queue, Buffer.from(request), {
    replyTo: replyQueue,
    correlationId,
  });
};

module.exports = {
  sendRequest,
  listenForRequests,
};
