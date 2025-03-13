const express = require('express');
const { addTask, getAllTasks, updateTask } = require('../controller/taskcontroller');
const auth = require('../middleware/auth');
const router = express.Router();
router.post("/add/:pid", addTask);
router.get("/getall", getAllTasks);

router.put('/update/:id', auth, updateTask);
module.exports = router;