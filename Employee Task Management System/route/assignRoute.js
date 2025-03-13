const express = require('express');
const { assignTaskToEmployee } = require('../controller/assigncontroller');

const router = express.Router();
router.post('/add', assignTaskToEmployee);
module.exports = router;