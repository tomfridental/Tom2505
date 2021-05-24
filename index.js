const express = require('express');
const path = require('path');
const morgan = require('morgan');
const userRouter = require('./src/server/routes/userRoutes');
// const db = require('./server/db/connection')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use(express.static(path.resolve('./build')))

app.use('/api/user', userRouter)


app.get('/', (req,res) => {
    res.send('Everythign is ok!')
})


const server = app.listen( 3030, ()=> {
    console.log(`Listening on 3030`)
})





