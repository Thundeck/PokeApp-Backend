const express= require('express');
const {getAllTypes } = require('../Controllers/Type.controller');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const types = express.Router()


types.get('/' , getAllTypes)



module.exports = types;