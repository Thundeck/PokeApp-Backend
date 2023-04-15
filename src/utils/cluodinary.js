const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv")
dotenv.config()

cloudinary.config({
    cloud_name: "dpw9bvt0u",
    api_key: process.env.API_KEY,
    api_secret:process.env.API_SECRET,
    secure:true
  });

module.exports = cloudinary;