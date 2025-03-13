const express = require('express')
const { getUserInfo, login } = require('../controller/authcontroller');
const auth = require('../middleware/auth');
const router = express.Router()
router.post('/login',login);
router.get('/user', auth, getUserInfo);

module.exports = router;