const mongoose = require("mongoose")

const Schema = mongoose.Schema

const TypeSchema = new Schema(
  {
    name: {
      type: String
    }
  })

const TypeModel = mongoose.model("type", TypeSchema)

module.exports = TypeModel
