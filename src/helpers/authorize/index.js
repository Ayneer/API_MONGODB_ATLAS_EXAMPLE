const axios = require('axios');
const { AXIOS_REQUEST_TIMEOUT, AUTH_SEARCH_URL } = process.env;

const isAuthorized = async (bearerToken) => {
  
  let response = null;

  // validate authentication
  if (bearerToken === undefined) {
    return response;
  }

  let token = bearerToken.split('Bearer ')[1];

  // Validate input header
  if (token === undefined) {
    return response;
  }

  let request = await axios.get(`${AUTH_SEARCH_URL}/authorize/${token}`, { timeout: AXIOS_REQUEST_TIMEOUT });
  
  if(request.status === 200){
    return request.data;
  }

  //return response
  return request;
}

const utils = {
  isAuthorized
};

module.exports = utils;
