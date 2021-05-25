require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const userRouter = require('./src/server/routes/userRoutes');
const db = require('./src/server/db/connection')
const cors = require('cors')

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json()); 
app.use(express.static(path.resolve('./build')))

app.use('/api/user', userRouter)


app.get('/', (req,res) => {
    res.send('Everythign is ok!')
})

db.connect();

const server = app.listen(process.env.SERVER_PORT, ()=> {
    console.log(`Listening on ${process.env.SERVER_PORT}`)
})





