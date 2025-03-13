const Admin = require("../model/admin");
const Employee = require("../model/employee");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const multer = require('multer')
const { validationResult } = require('express-validator')
exports.addingEmployee = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        let obj = req.user;
        let userN = obj.username;
        //check if this admin's userN
        let admin = await Admin.findOne({ 'username': userN });
        if (!admin)
            return res.status(401).json({ 'msg': 'Unauthorized' });
        let { name, jobTitle, city, salary, profilePic, cv, username, password } = req.body;
        //encrype/encode the password
        let salt = 10; //needed for hash algo: SHA256 
        const hashedPassword = await bcrypt.hash(password, salt);
        let employee = new Employee({ name, jobTitle, city, salary, profilePic, cv, username, 'password': hashedPassword })

        employee = await employee.save();
        return res.status(200).json(employee);
    }
    catch (err) {
        return res.status(400).json(err)
    }
}

exports.gettingAllEmployee = async (req, res) => {
    try {
        let obj = req.user;//getting the username from auth without decoding the username again
        let username = obj.username;//here in obj it contain details like iat and exp and username..we require only username

        let admin = await Admin.findOne({ 'username': username });
        if (!admin)
            return res.status(401).json({ 'msg': 'Unauthorized' });
        const employees = await Employee.find();
        return res.json(employees)
    }
    catch (err) {
        return res.status(400).json('Error in api')
    }
}
exports.getEmployeeById = async (req, res) => {
    try {
        let obj = req.user;
        let username = obj.username;

        let employee = await Employee.findOne({ 'username': username })

        if (employee === undefined || employee == null)
            return res.status(400).json({ 'msg': 'Invalid Credentials!!' })
        let id = req.params.id;
        const employees = await Employee.findOne({ '_id': id });
        return res.status(200).json(employees)
    }
    catch (err) {
        return res.status(400).json(err.message)
    }
}
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ err: errors.array() });
    }

    const { username, password } = req.body;
    const employee = await Employee.findOne({ username });

    // Check if employee exists before accessing properties
    if (!employee) {
        return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isValid = await bcrypt.compare(password, employee.password);

    if (!isValid) {
        return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const SECRET_KEY = "15111983200722";
    const employeeObj = {
        username: employee.username
    };

    const token = jwt.sign(employeeObj, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
};

exports.getProfile = async (req, res) => {
    try {
        const obj = req.user;
        const username = obj.username;
        console.log(username);
        const employee = await Employee.findOne({ username });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
exports.uploadCv = async (req, res) => {
    try {
        let obj = req.user;
        let username = obj.username;

        let employee = await Employee.findOne({ 'username': username })

        if (employee === undefined || employee == null)
            return res.status(400).json({ 'msg': 'Invalid Credentials!!' })

        if (!req.file) {
            return res.status(400).json({ 'msg': 'No File detected!!' })
        }

        const multerFileName = req.file.filename;
        const mimeType = req.file.mimetype;//docs,pdf
        const originalFileName = req.file.originalname;
        const fileExtension = mimeType.split('/').pop()

        const allowedExtensions = ['docx', 'pdf'];
        if (!allowedExtensions.includes(fileExtension)) //true or false
        {
            return res.status(400).json({ 'msg': 'File Not allowed!! Allowed Types ' + allowedExtensions })
        }
        employee.cv = multerFileName + '.' + fileExtension

        employee = await employee.save(employee);
        res.json(employee);
    }
    catch (err) {
        return res.status(400).json(err)
    }
}
exports.uploadProfile = async (req, res) => {
    try {
        let obj = req.user;
        let username = obj.username;

        let employee = await Employee.findOne({ 'username': username })

        if (employee === undefined || employee == null)
            return res.status(400).json({ 'msg': 'Invalid Credentials!!' })

        if (!req.file) {
            return res.status(400).json({ 'msg': 'No File detected!!' })
        }

        const multerFileName = req.file.filename;
        const mimeType = req.file.mimetype;
        const originalFileName = req.file.originalname;
        const fileExtension = mimeType.split('/').pop()

        const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif', 'svg'];
        if (!allowedExtensions.includes(fileExtension)) {
            return res.status(400).json({ 'msg': 'File Not allowed!! Allowed Types ' + allowedExtensions })
        }
        employee.profilePic = multerFileName + '.' + fileExtension

        employee = await employee.save(employee);
        res.json(employee);
    }
    catch (err) {
        return res.status(400).json({ 'err': err.message })
    }
}

