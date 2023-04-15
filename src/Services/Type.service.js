const TypeModel = require("../Models/Type")
const {API_POKEMON_TYPE} = require('../utils/globals')
const axios = require('axios')

const createAllTypes = async () =>{
try {
    const {data} = await axios.get(API_POKEMON_TYPE)
    const allTypesApi =data.results.map(e => e.name)


    allTypesApi.forEach(async (e) => {
        try {
            const find = await TypeModel.findOne({name:e})
            if (find) throw "Already created";
            const create = await TypeModel.create({name:e})
        } catch (error) {
            console.log(error)
        }
        
    })

    const types = await TypeModel.find()
    if (!types) throw "No types";
    return "all types created";
} catch (error) {
    console.log(error)
}
}

const getAllTypes = async () =>{
    try {
        const types = await TypeModel.find()
        if (!types) throw "No types";
        return types;
    } catch (error) {
        console.log(error)
    }
    }

module.exports = {
    getAllTypes,
    createAllTypes
}