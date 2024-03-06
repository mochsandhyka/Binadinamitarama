const express = require('express')
const router = express.Router()
const {createAgent} = require('../controllers/agent')


router.route('/agent/create').post(createAgent)


module.exports = router