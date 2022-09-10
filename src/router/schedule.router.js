const express = require('express')
const router = express.Router()
const controller = require('../controller/schedule.controller')

router.get('/', controller.getAll)
router.post('/api/v1/classes', controller.create)

module.exports = router