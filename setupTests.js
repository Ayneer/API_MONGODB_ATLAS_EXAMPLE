require('dotenv').config({ path: './.envMock' });
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const MockAdapter = require('axios-mock-adapter');

process.env.NODE_ENV = "development";
global.chai = chai;
global.expect = expect;
global.sinon = sinon;
global.MockAdapter = MockAdapter;
