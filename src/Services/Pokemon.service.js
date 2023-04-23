const axios = require('axios')
const PokemonModel = require("../Models/Pokemon")
const TypeModel = require("../Models/Type")
const cloudinary = require('../utils/cluodinary')
const {API,API_POKEMON_TYPE} = require('../utils/globals')
const dotenv = require("dotenv")
const { types } = require('pg')
dotenv.config()

const getAllPokemons = async () =>{
    try {

        const pokemonsDB = await PokemonModel.find().populate("types",{__v:0})

        if (!pokemonsDB) throw "No data";
        return pokemonsDB;
    } catch (error) {
        console.log(error)
    }
}

const populateDB = async () =>{
    try {
        const api = await axios.get(API)
        const arrPokemons = await axios.all(api?.data?.results?.map( e=> axios.get(e?.url)))
        const info = arrPokemons?.map( e => e?.data)


        const pokemonsApi = info.map(e => {return {
        name:e.name,
        health:e.stats[0].base_stat,
        attack:e.stats[1].base_stat ,
        defense:e.stats[2].base_stat ,
        speed:e.stats[5].base_stat ,
        height:e.height,
        weight:e.weight,
        sprites:[e.sprites.front_default ,e.sprites.front_shiny],
        types: e.types.map(e => e.type).map(e => e.name)
        }})
    
        pokemonsApi.forEach(async(e) => {
            try {
                const find = await PokemonModel.findOne({name:e.name})
                if (find) throw "Already created";
                const types = await TypeModel.find(),
                filter = types.filter(t => e.types.includes(t.name)).map(l => l._id)
                const create = await PokemonModel.create({...e, types:filter})
            } catch (error) {
                console.log(error)
            }
            
        })
    
        const pokemons = await PokemonModel.find()
        if (!pokemons) throw "No pokemons";
        return "all pokemos created";
    } catch (error) {
        console.log(error)
    }
    }

const createPokemon = async (data) => {

    const {
          sprites,
          name,
          types
    } = data

    if (Object.values(data).includes("")) throw "All fields are required";
    if(types.length < 1) throw "at least one type is required"
    if(sprites.length < 1) throw "at least one sprite is required"

    try {
        const arrSprites = await axios.all(sprites.map( img => cloudinary.uploader.upload(img, {
            folder: "Pokemons"
          })))
        const links = arrSprites.map(e => e.secure_url)
        const typesDB = await TypeModel.find()

        const find = await PokemonModel.findOne({name})
        if (find) throw "pokemon already created"

        const create = await PokemonModel.create({...data, sprites:links, types:typesDB?.filter(t => types.includes(t.name)).map(l => l._id)})

        return create

        
    } catch (error) {
        console.log(error)
    }

}

const getPokemonName = async (name) => {
    if(!name) throw "name is required"
    try {
        const found = await PokemonModel.findOne(name).populate("types")
        if (!found) throw new Error("Can't find pokemon")
        return found
    } catch (error) {
        console.log(error)
    }

}

const getPokemonDetails = async (_id) => {
    if(!_id) throw "id is required"

    try {
        const found = await PokemonModel.findById(_id).populate("types",{__v:0})
        return found
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