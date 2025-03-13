const express = require('express');
const { addProject, getAllProjects } = require('../controller/projectcontroller');
const auth = require('../middleware/auth');
const router = express.Router();
router.post('/add', auth, addProject);
router.get('/get', getAllProjects);
module.exports = router;