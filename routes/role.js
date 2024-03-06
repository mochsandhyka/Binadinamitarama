const express = require('express')
const router = express.Router()
const {createRole,getRoles} = require('../controllers/role')


router.route('/role/create').post(createRole)
router.route('/roles').get(getRoles)

module.exports = router