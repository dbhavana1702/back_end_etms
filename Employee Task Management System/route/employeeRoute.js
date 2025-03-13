const express = require('express');
const { addingEmployee, gettingAllEmployee, login, uploadCv, uploadProfile, getEmployeeById, getProfile } = require('../controller/employeecontroller');
const auth = require('../middleware/auth');
const { body } = require('express-validator');
//const { addEmployee, getAllEmployee } = require('../controller/employeeController');
const multer = require('multer')
const router = express.Router();
const upload = multer({ dest: 'C:/Users/duvvu/OneDrive/Desktop/Hexaware2/etms-ui/public/docs/cv/' })
const uploads = multer({ dest: 'C:/Users/duvvu/OneDrive/Desktop/Hexaware2/etms-ui/public/profile/images/' })
router.post('/add', [
    body('username').not().isEmpty(),
    body('password').isLength({ min: 6, max: 14 })
], auth, addingEmployee);
router.get('/get', auth, gettingAllEmployee);
router.post('/login', [
    body('username').not().isEmpty(),
    body('password').not().isEmpty()
], login);
router.post("/uploadcv", upload.single('file'), auth, uploadCv)
router.post("/uploadprofile", uploads.single('file'), auth, uploadProfile)
router.get("/getById/:id", auth, getEmployeeById);
router.get('/getProfile', auth, getProfile)
module.exports = router; 