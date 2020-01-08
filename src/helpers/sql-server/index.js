//Cliente Sql server
const sql = require('mssql');
let pool;

//Mongo connection
const {
    SQL_USER,
    SQL_PASSWORD,
    SQL_SERVER,
    SQL_DATABASE
} = process.env;

const config = {
    user: SQL_USER,
    password: SQL_PASSWORD,
    server: SQL_SERVER,
    database: SQL_DATABASE
}
 
const connect = async () => {
    try {
        pool = await sql.connect(config);
    } catch (err) {
        console.error(err);
    }
};

const query = async (sqlQuery) => {
    try {
        let _Request = await pool.request();
        let result = await _Request.query(sqlQuery);

        return {
            isError: false,
            errorCode: null,
            errorLineNumber: null,
            errorMessage: null,
            data: result.recordset
        };
 
    } catch (err) {
        return {
            isError: true,
            errorCode: err.code,
            errorLineNumber: err.lineNumber,
            errorMessage: err.originalError.info.message,
            data: null
        };
    }
};


storedProcedure = async ({
    _Procedure
}) => {
    try {
        let _Request = await pool.request();
        for (var i = 0; i < _Procedure.parameters.length; i++) {
            await _Request.input(_Procedure.parameters[i].name, _Procedure.parameters[i].type, _Procedure.parameters[i].value);
        }

        let result = await _Request.execute(_Procedure.name);

        return {
            isError: false,
            errorCode: null,
            errorLineNumber: null,
            errorMessage: null,
            data: result.recordset
        };

    } catch (err) {
        return {
            isError: true,
            errorCode: err.code,
            errorLineNumber: err.lineNumber,
            errorMessage: err.originalError.info.message,
            data: null
        };
    }
};



const sqlHelper = {
    connect,
    query,
    storedProcedure
};

module.exports = sqlHelper;
