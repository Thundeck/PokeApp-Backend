const PokemonService = require("../Services/Pokemon.service")

const getAllPokemons = async (_req, res) =>{
    try {
        const Pokemons = await PokemonService.getAllPokemons()
        res.json(Pokemons)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getPokemonDetails = async (req, res) =>{
    const {id} = req.body
    console.log(id)
    try {
        const Pokemons = await PokemonService.getPokemonDetails(id)
        res.json(Pokemons)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getPokemonName = async (req, res) =>{
    const {name} = req.body
    try {
        const Pokemons = await PokemonService.getPokemonName(name.toLowerCase())
        res.json(Pokemons)
    } catch (error) {
        res.status(400).send(error)
    }
}

const createPokemon = async (data) =>{
    try {
        const Pokemon = await PokemonService.createPokemon(data)
        Pokemon && console.log("created")
    } catch (error) {
        res.status(400).send(error)

    }
}

const populateDB = async () =>{
    try {
        const Pokemon = await PokemonService.populateDB()
    } catch (error) {
       console.log(error)

    }
}

module.exports = {
    getAllPokemons,
    createPokemon,
    getPokemonDetails,
    getPokemonName,
    populateDB
}