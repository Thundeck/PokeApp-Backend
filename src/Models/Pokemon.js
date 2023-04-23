const mongoose = require("mongoose")

const Schema = mongoose.Schema

const OBJECT = mongoose.Types.ObjectId

const PokemonSchema = new Schema(
{
    sprites: {
      type: Array
    },
    name: {
      type: String,
      require: true,
      unique:true
    },
    health: {
      type: Number,
    },
    attack: {
      type: Number,
    },
    defense: {
      type: Number,
    },
    speed: {
      type: Number,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    types:{
      type:[OBJECT],
      require:true,
      ref:"type"
  }

})

const PokemonModel = mongoose.model("pokemon", PokemonSchema)

module.exports = PokemonModel
