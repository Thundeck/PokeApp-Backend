const express = require('express');
const { 
    getAllPokemons,
    getPokemonName,
    getPokemonDetails,
    createPokemon 
} = require('../Controllers/Pokemon.controller')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const route = express.Router()

route.get('/' , getAllPokemons)

route.post('/search' ,getPokemonName)

route.post('/details' ,getPokemonDetails)

route.post('/' , createPokemon)



module.exports = route;