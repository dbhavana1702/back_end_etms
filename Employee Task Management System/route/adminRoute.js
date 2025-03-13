const express = require('express');
const { addAdmin, login } = require('../controller/admincontroller');
const { body } = require('express-validator');
const router = express.Router();
router.post('/add',[
    body('username').not().isEmpty(),
    body('password').isLength({ min: 6, max: 14 })
], addAdmin);
router.post('/login',[
    body('username').not().isEmpty(),
    body('password').not().isEmpty()
], login);
module.exports = router;