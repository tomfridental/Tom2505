const express = require('express');
const User = require('../model/userModel')


const router = express.Router();
router.use(express.json())


//Test Route
router.get('/', (req, res) => {
    res.json({ Hello: 'Worlddd' })
})

//Create new User
router.post('/create', async (req, res) => {
    try {

        let userAlreadyExists = await User.findOne({ email: req.body.email }).lean();
        if (userAlreadyExists) {
            res.json({
                error: 'User Already Exists!'
            })
            return;
        }


        const user = new User(req.body);
        await user.save()

        res.json({
            msg: 'User Saved!'
        })

    } catch (err) {
        res.json({
            error: 'Something went wrong'
        })
    }
})

//Get Likes//
router.get('/getusers', async (req, res) => {
    try {
        const index = parseInt(req.query.index) || 0;
        const limit = parseInt(req.query.limit) || 0;

        const nextUserIndex = index + limit;

        const users = await User.find().skip(index).limit(limit).lean();

        const IsMoreUsersAvailable = await User.findOne().skip(nextUserIndex).lean();

        res.json({ IsMoreUsersAvailable: !!IsMoreUsersAvailable, Data: users })
    }
    catch (err) {
        res.json({ error: 'Something went wrong' })
    }
})

module.exports = router;