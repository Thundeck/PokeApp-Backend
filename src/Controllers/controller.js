const axios = require('axios')
const {API,API_POKEMON_TYPE} = require('../../utils/globals.js')
const {Pokemon, Types} = require('../db.js')

// allPokemonsApi

const allPokemonsApi = async ()=>{
    const api = await axios.get(API)
    const arrPokemons = await axios.all(api.data.results.map( e=> axios.get(e.url))).then(r => r.map( e => e.data))

    const pokemons = arrPokemons.map(e => {return {
      id:e.id,
      name:e.name,
      health:e.stats[0].base_stat,
      attack:e.stats[1].base_stat ,
      defense:e.stats[2].base_stat ,
      speed:e.stats[5].base_stat ,
      height:e.height,
      weight:e.weight,
      sprites:[e.sprites.front_default ,e.sprites.front_shiny],
      types: e.types.length > 1 ? [{name:e.types[0].type.name},{name:e.types[1].type.name}] : [{name:e.types[0].type.name}]
    }})
    return pokemons
  }

  const allPokemonsDB = async ()=>{
    const api = await Pokemon.findAll({include:Types})
    // return [...api, {msg: 'hola soy una prueba'}]
    return api
  }

  const allPokemons = async() => {
    const allPokesApi = await allPokemonsApi()
    let allPokesDB = await allPokemonsDB()

    return [...allPokesApi,...allPokesDB]
  }

  const allTypes = async ()=>{

    try { 
    const {data} = await axios.get(API_POKEMON_TYPE)
    const allTypesApi =data.results.map(e => e.name)

    allTypesApi.forEach(e => Types.findOrCreate({
      where: {
        name: e
      }
    }))
    const allTypes = await Types.findAll()

    return allTypes

  } catch(error){res.status(404).send(error)}
}

module.exports = {
    allPokemons,
    allTypes
}