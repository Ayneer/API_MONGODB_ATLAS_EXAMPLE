'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const getCredentials = () => {
  //Mongo connection
  const {
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DATABASE,
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_REPLICASET,
    MONGO_SSL,
    MONGO_AUTH_SOURCE
  } = process.env;

  let replicas = MONGO_HOST.split(',')
    .map(url => `${url}:${MONGO_PORT}`)
    .join(',');

  const MONGO_URL = `mongodb://${replicas}/${MONGO_DATABASE}`;
  return {
    MONGO_URL,
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_REPLICASET,
    MONGO_SSL,
    MONGO_AUTH_SOURCE
  };
};

const connect = async () => {
  const mongoCredentials = helper.getCredentials();
  console.info(`Connecting to ${mongoCredentials.MONGO_URL}`);

  try {
    await mongoose.connect(mongoCredentials.MONGO_URL, {
      user: mongoCredentials.MONGO_USER,
      pass: mongoCredentials.MONGO_PASSWORD,
      replicaSet: mongoCredentials.MONGO_REPLICASET,          //required when multiple host are set (replicas)
      ssl: mongoCredentials.MONGO_SSL == '1' ? /* istanbul ignore next */ true : false,  //true for mongo atlas
      authSource: mongoCredentials.MONGO_AUTH_SOURCE,         //Auth DB
      reconnectTries: 30000,
      reconnectInterval: 1000,
      useNewUrlParser: true
    });

    console.info('Connected successfully to mongodb');

    const connection = mongoose.connection;
    /* istanbul ignore next */
    connection.on('connecting', () => console.info('Connecting to mongodb'));
    /* istanbul ignore next */
    connection.on('disconnecting', () => console.info('Disconnecting from mongodb'));
    /* istanbul ignore next */
    connection.on('disconnected', () => console.info('Disconnected from mongodb'));
    /* istanbul ignore next */
    connection.on('close', () => console.info('Mongodb connection closed'));
    /* istanbul ignore next */
    connection.on('error', err => console.info('Error Connecting to mongodb', err.message));
    /* istanbul ignore next */
    connection.on('reconnected', () => console.info('Mongodb reconnected successfully'));

    return true;
  } catch (err) {
    console.info('Mongodb connection error',err);
    return false;
  }
};

/* istanbul ignore next */
const isConnected = () => {
  return mongoose.connection.readyState === 1 ? true : false;
};

const helper = {
  getCredentials,
  connect,
  isConnected
};

module.exports = helper;
