'use strict';

describe(`Mongo helper`, () => {
  const mongoose = require('mongoose');
  mongoose.Promise = global.Promise;

  const helper = require('./index');
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

  describe(`When getting the connection settings from the env vars`, () => {
    it('should return the right connection options', () => {
      const { MONGO_URL: returnedUrl } = helper.getCredentials();
      const expectedUrl = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
      expect(returnedUrl).to.be.equal(expectedUrl);
    });

    describe('When the user credentials are set', () => {
      it('should return the right auth connection options', () => {
        const {
          MONGO_USER: returnedUser,
          MONGO_PASSWORD: returnedPassword
        } = helper.getCredentials();
        expect(returnedUser).to.be.equal(MONGO_USER);
        expect(returnedPassword).to.be.equal(MONGO_PASSWORD);
      });
    });

    describe('When the user credentials are NOT set', () => {
      it('should return the right connection string', () => {
        delete process.env.MONGO_USER;
        delete process.env.MONGO_PASSWORD;

        const {
          MONGO_USER: returnedUser,
          MONGO_PASSWORD: returnedPassword
        } = helper.getCredentials();
        expect(returnedUser).to.be.equal(undefined);
        expect(returnedPassword).to.be.equal(undefined);

        process.env.MONGO_USER = MONGO_USER;
        process.env.MONGO_PASSWORD = MONGO_PASSWORD;
      });
    });
  });

  describe('When connecting to the mongo database', () => {
    beforeEach(() => {
      sinon.stub(console, 'info');
    });
    afterEach(() => {
      console.info.restore();
    });

    let mongooseMock;
    const theExpectedCredentials = {
      MONGO_URL: MONGO_HOST,
      MONGO_USER: MONGO_USER,
      MONGO_PASSWORD: MONGO_PASSWORD,
      MONGO_REPLICASET: MONGO_REPLICASET,
      MONGO_SSL: MONGO_SSL,
      MONGO_AUTH_SOURCE: MONGO_AUTH_SOURCE
    };

    const connectionOptions = {
      user: theExpectedCredentials.MONGO_USER,
      pass: theExpectedCredentials.MONGO_PASSWORD,
      replicaSet: theExpectedCredentials.MONGO_REPLICASET,
      ssl: theExpectedCredentials.MONGO_SSL == '1' ? true : false,
      authSource: theExpectedCredentials.MONGO_AUTH_SOURCE,
      reconnectTries: 30000,
      reconnectInterval: 1000,
      useNewUrlParser: true
    };
    beforeEach(() => {
      mongooseMock = sinon.mock(mongoose);
      sinon.stub(helper, 'getCredentials').returns(theExpectedCredentials);
    });
    afterEach(() => {
      mongooseMock.restore();
      helper.getCredentials.restore();
    });
    it('should call the helper.getCredentials to obtain a string formated with this data', async () => {
      await helper.connect();
      expect(helper.getCredentials.calledOnce).to.be.true;
    });
    describe('when the connection is successfull', () => {
      it('should connect succesfully to the mock database', async () => {
        mongooseMock
          .expects('connect')
          .withArgs(theExpectedCredentials.MONGO_URL, connectionOptions)
          .resolves({});
        sinon.stub(mongooseMock.object, 'connection').returns({
          on: () => {
            return {};
          }
        });
        await helper.connect();
        mongooseMock.verify();
      });
      it('should return true', async () => {
        mongooseMock
          .expects('connect')
          .withArgs(theExpectedCredentials.MONGO_URL, connectionOptions)
          .resolves({});
        const response = await helper.connect();
        expect(response).to.be.true;
      });
    });

    describe('When an error ocurrs when trying to connect to the mongo database', () => {
      it('should handle the mongoose.connect rejections', async () => {
        mongooseMock
          .expects('connect')
          .withArgs(theExpectedCredentials.MONGO_URL, connectionOptions)
          .rejects({ error: { message: 'the error' } });
        await helper.connect();
        mongooseMock.verify();
      });
      it('should return false', async () => {
        mongooseMock
          .expects('connect')
          .withArgs(theExpectedCredentials.MONGO_URL, connectionOptions)
          .rejects({ error: { message: 'the error' } });
        const response = await helper.connect();
        expect(response).to.be.false;
      });
    });

  });
});
