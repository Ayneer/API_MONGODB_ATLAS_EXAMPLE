const express = require('express');
const router = express.Router();

const { APP_NAME } = process.env

module.exports = () => {
  //index 
  const indexRouter = express.Router();
  indexRouter.get('/', (req, res) => {
    res.status(200).json({ response: APP_NAME + ' SIOS ASISTENCIAL ADMISIONES is working properly.' });
  });

  //request
  const requestsRouter = express.Router();

  //Using Auth middleware for the request routes
  // requestsRouter.use(require('../src/middlewares/authorize'));

  //Controllers
  //const testController = require('./controllers/test');
  //Controllers pacientes
  const pacientesController = require('./controllers/pacientes');

  //requestsRouter.get('/test/authorize', testController.authorize);
  //requestsRouter.get('/test/db/query/:user_name', testController.query);
  //requestsRouter.get('/test/db/store_procedure/:user_name', testController.store_procedure);
  
  // Routes 
  requestsRouter.post('/pacientes/actualizar', pacientesController.actualizar);
  requestsRouter.post('/pacientes', pacientesController.insertar);
  requestsRouter.get('/pacientes', pacientesController.buscarPacientes);
  requestsRouter.get('/pacientes/:id', pacientesController.buscarPaciente);
  requestsRouter.delete('/pacientes/:id', pacientesController.eliminar);
    
  //Set routers
  router.use('/', indexRouter);
  router.use('/', requestsRouter);

  return router;
};
