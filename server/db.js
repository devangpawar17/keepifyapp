const mongoose = require('mongoose')
const mongouri = process.env.DB_HOST

const connectToMongo=async()=>{
    mongoose.connect(mongouri,()=>{
        console.log('connected to mongo successfully');
    })
}

module.exports = connectToMongo