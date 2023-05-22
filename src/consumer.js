const amqp = require('amqplib');
const Listener = require('./Listener');
const MailSender = require('./MailSender');
const NotesService = require('./NotesService');

const init = async () => {
  const listener = new Listener(
    new NotesService(),
    new MailSender(),
  );
  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:notes', {
    durable: true,
  });

  channel.consume('export:notes', listener.listen, { noAck: true });
};

module.exports = init;
