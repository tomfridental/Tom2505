const mongoose    = require('mongoose');
mongoose.Promise = require('bluebird');



  const {DB_HOST, DB_PORT, DB_NAME, API_HOST} = process.env

// const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
const uri = `mongodb+srv://tom2505:ortaltom1@users.rudes.mongodb.net/UsersDB?retryWrites=true&w=majority`

const connect = async ()=> {
    try{
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('✨ Connected to Mongo DB ✨')
    }catch(error){
        console.log(error)
    }
}


module.exports = { connect };
