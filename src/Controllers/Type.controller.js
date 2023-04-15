const TypeService = require("../Services/Type.service")

const getAllTypes = async (_req, res) =>{
    try {
        const Types = await TypeService.getAllTypes()
        res.json(Types)
    } catch (error) {
        res.status(400).send(error)
    }
}

const createAllTypes = async () =>{
    try {
        const Types = await TypeService.createAllTypes()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllTypes,
    createAllTypes
}