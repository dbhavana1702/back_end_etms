const express = require('express');
const auth = require('../middleware/auth');
const { addComments, getComments, getCommentById } = require('../controller/commentscontroller');
const router = express.Router();
router.post('/add', auth, addComments);
router.get('/getAll', auth, getComments);
router.get('/get/:id', getCommentById);
module.exports = router;