const amqplib = require("amqplib");

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

let connection;

const getConnection = async () => {
  if (connection) return connection;
  connection = await amqplib.connect(RABBITMQ_URL);
  return connection;
};

const listenForRequests = async (queue, requestHandler) => {
  const connection = await getConnection();
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: true });
  channel.consume(queue, requestHandler, { noAck: true });
};

const sendRequest = async (queue, request, correlationId) => {
  const connection = await getConnection();
  const channel = await connection.createChannel();
  channel.sendToQueue(queue, Buffer.from(request), { correlationId });
};

module.exports = {
  sendRequest,
  listenForRequests,
};
