const { Router } = require('express');
const router = Router();


//routers
const pokemons = require('./Pokemon');
const types = require('./Type')

// Configurar los routers
router.use('/pokemons', pokemons)
router.use('/types', types)


module.exports = router;
