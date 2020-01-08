const sqlHelper = require('../../helpers/sql-server');
const sql = require('mssql');

const query = async (param) => {
  let response = await sqlHelper.query("SELECT * FROM [aspnet_Users] WHERE UserName = '"+param+"'");
  return response;
};

const store_procedure = async (param) => {
  var _Procedure = {};
  var _Parameters = [];

  _Procedure.name = 'usp_TestUsuarios';


  _Parameter_UserName = {};
  _Parameter_UserName.name = 'UserName'; _Parameter_UserName.value = param; _Parameter_UserName.type = sql.VarChar;
  _Parameters.push(_Parameter_UserName);

  _Procedure.parameters = _Parameters;
  let response = await sqlHelper.storedProcedure({ _Procedure });


  return response;
};

const repo = {
  query,
  store_procedure
};

module.exports = repo;