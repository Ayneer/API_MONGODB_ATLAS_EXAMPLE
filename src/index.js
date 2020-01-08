const path = require('path');

require('dotenv').config({ path: `${path.dirname(__dirname)}/.env` });
const { NODE_ENV = 'development', PORT = 3019 , NEW_RELIC_LIC_KEY, NEW_RELIC_APP_NAME } = process.env;
const mongo = require('./helpers/mongo');
const sqlHelper = require('./helpers/sql-server');

//NewRelic
// if (NODE_ENV === 'production' || NODE_ENV === 'development') {
//   require('newrelic');
// }

//connect mongo
if (!mongo.isConnected()) {
  mongo.connect();
}

// sqlHelper.connect();

 //Express Server
 const app = require('./app');
 app.listen(PORT, () => {
   console.log(`Listening on port ${PORT} running ${NODE_ENV} environment`);

   if (mongo.isConnected()) {
     console.log(`Mongo isConnected:${mongo.isConnected()} on ${NODE_ENV} environment`);
   }
 });
