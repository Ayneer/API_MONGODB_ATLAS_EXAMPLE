const objRepositorio = require('../../repositories/pacientes');

const {NOT_FOUND_ERROR_MESSAGE, INTERNAL_ERROR_MESSAGE} = process.env;

async function handler(req, res, next) {
    try {

        var objData = req.body

        //find
        let response = await objRepositorio.eliminar(objData);

        //set status code
        let statusCode;
        switch (response.status) {
            case NOT_FOUND_ERROR_MESSAGE:
                statusCode = 404;
                break;
            case INTERNAL_ERROR_MESSAGE:
                statusCode = 500;
                break;
            default:
                statusCode = 200;
        }
        //Response Object
        let oResponse = {
            datos: response.datos,
            Error: false,
            Mensaje: "OK"
        }

        //return response
        if (statusCode !== 200) {
            oResponse.status = response.status;
            oResponse.code = response.failure_code;
            oResponse.Error = true;
            oResponse.Mensaje = response.failure_message;
        }

        res.status(statusCode).send(oResponse);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = handler;