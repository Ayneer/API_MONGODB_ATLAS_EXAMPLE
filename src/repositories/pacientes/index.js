const objModel = require('../../models/pacientes');

const { INTERNAL_ERROR_MESSAGE, SUCCEEDED_MESSAGE } = process.env

const repo = {

    getPacientes: async ({ findObject }) => {
        try {
            //find query
            let query = {};

            query[findObject.key] = (findObject.value);

            //find object
            let response = await objModel.find(query).sort('nombre');

            //set values
            let status, failure_code, failure_message;
            //Set status
            status = SUCCEEDED_MESSAGE;

            //return response
            return {
                status: status,
                datos: response,
                failure_code: failure_code,
                failure_message: failure_message,
            };

        } catch (e2) {
            return {
                status: INTERNAL_ERROR_MESSAGE,
                failure_code: e2.code,
                failure_message: e2.message,
            };
        }
    },

    findDiagnosticos2: async ({ findObject }) => {
        try {
            //find query

            let query = {};

            if (findObject.search.value) {
                query = new Object({

                    Filtro: { $regex: (".*" + findObject.search.value.replace(new RegExp(' ', 'g'), '.*')), $options: "i" }

                });
            }

            let iSkip = (parseInt(findObject.start) * parseInt(findObject.length)) - 1;
            let iCount = await objModel.find(query).estimatedDocumentCount();

            //find object
            let response = await objModel.find(query).sort('Codigo').skip((iSkip > 0 ? iSkip : 0)).limit(parseInt(findObject.length));

            //set values
            let status, failure_code, failure_message;
            //Set status
            status = SUCCEEDED_MESSAGE;

            //return response
            return {
                recordsTotal: iCount,
                recordsFiltered: iCount,
                data: response,
                failure_code: failure_code,
                failure_message: failure_message,
            };

        } catch (e2) {
            return {
                status: INTERNAL_ERROR_MESSAGE,
                failure_code: e2.code,
                failure_message: e2.message,
            };
        }
    },

    filtar: async (findObject) => {

        let status, failure_code, failure_message, sMensaje, bError, response;

        try {

            console.log("IN Modelo findObject", JSON.stringify(findObject));

            //find object
            response = await objModel.find(findObject).limit(6).sort('Nombre');

            console.log("response", response);


        } catch (e2) {

            bError = true;
            sMensaje = e2.message;
            failure_code = e2.code;
            failure_message = e2.message;

        }

        //Set status
        status = SUCCEEDED_MESSAGE;
        //objeto con el resultado de la operación este se retornara con el nombre del controlador --> pacientes
        //return response 
        return {
            status: status,
            Datos: response,
            Mensaje: sMensaje,
            Error: bError,
            failure_code: failure_code,
            failure_message: failure_message
        };


    },

    buscarPacientes: async () => {
        try {

            //find object
            let response = await objModel.find().sort('nombre');

            //return response
            return {
                status: SUCCEEDED_MESSAGE,
                datos: response,
                failure_code: null,
                failure_message: null,
            };

        } catch (e2) {
            return {
                status: INTERNAL_ERROR_MESSAGE,
                failure_code: e2.code,
                failure_message: e2.message,
            };
        }
    },

    buscarPaciente: async (objData) => {
        try {

            let status, failure_code, failure_message;

            let objFiltro = { _id: objData._id };
            console.log(objFiltro)
            //find object
            let response = await objModel.findById(objFiltro);

            //return response
            return {
                status: SUCCEEDED_MESSAGE,
                datos: response,
                failure_code: null,
                failure_message: null,
            };

        } catch (e2) {
            return {
                status: INTERNAL_ERROR_MESSAGE,
                failure_code: e2.code,
                failure_message: e2.message,
            };
        }
    },

    insertar: async (objData) => {
        try {

            let status, failure_code, failure_message;

            //find object
            let response = await objModel.insertMany([objData]);

            //set values
            if (response != null && response.length > 0) {
                //Set status
                status = SUCCEEDED_MESSAGE;
            } else {
                //Set status
                status = FAILED_MESSAGE;
            }

            //return response
            return {
                status: status,
                datos: response,
                failure_code: failure_code,
                failure_message: failure_message,
            };

        } catch (e2) {
            return {
                status: INTERNAL_ERROR_MESSAGE,
                failure_code: e2.code,
                failure_message: e2.message,
            };
        }
    },

    actualizar: async (objData) => {
        try {

            let status, failure_code, failure_message;

            let objFiltro = { _id: objData._id };

            //find object
            let response = await objModel.findOneAndUpdate(objFiltro, objData , { new: true});

            //set values
            if (response != null && response.length > 0) {
                //Set status
                status = SUCCEEDED_MESSAGE;
            } else {
                //Set status
                status = SUCCEEDED_MESSAGE;
            }

            //return response
            return {
                status: status,
                datos: response,
                failure_code: failure_code,
                failure_message: failure_message,
            };

        } catch (e2) {
            return {
                status: INTERNAL_ERROR_MESSAGE,
                failure_code: e2.code,
                failure_message: e2.message,
            };
        }
    },

    eliminar: async (objdata) => {
        try {

            let status, failure_code, failure_message;

            let objFiltro = { _id: objdata._id };

            //find object
            let response = await objModel.findOneAndRemove(objFiltro, objdata);

            //set values
            if (response != null && response.length > 0) {
                //Set status
                status = SUCCEEDED_MESSAGE;
            } else {
                //Set status
                status = SUCCEEDED_MESSAGE;
            }

            //return response
            return {
                status: status,
                datos: response,
                failure_code: failure_code,
                failure_message: failure_message,
            };

        } catch (e2) {
            return {
                status: INTERNAL_ERROR_MESSAGE,
                failure_code: e2.code,
                failure_message: e2.message,
            };
        }
    }

};
module.exports = repo;