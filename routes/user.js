const express = require('express')
const router = express.Router()
const {createUser} = require('../controllers/user')


router.route('/user/create').post(createUser)


module.exports = router