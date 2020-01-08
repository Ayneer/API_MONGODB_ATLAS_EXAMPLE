'use strict';

const { NEW_RELIC_LIC_KEY, NEW_RELIC_APP_NAME, NODE_ENV } = process.env;

exports.config = {
  app_name: [`${NEW_RELIC_APP_NAME}`],
  license_key: `${NEW_RELIC_LIC_KEY}`,
  logging: {
    level: 'info',
    enabled: NODE_ENV === 'production' || NODE_ENV === 'test'
  }
};
