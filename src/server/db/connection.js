const mongoose    = require('mongoose');
mongoose.Promise = require('bluebird');

const { DB_USER, DB_NAME } = process.env

const uri = `mongodb+srv://${DB_USER}@users.rudes.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

const connect = async ()=> {
    try{
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('✨ Connected to Mongo DB ✨')
    }catch(error){
        console.log(error)
    }
}


module.exports = { connect };
