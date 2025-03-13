const bcrypt = require('bcryptjs');
const Admin = require('../model/admin');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
exports.addAdmin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    let { username, password } = req.body;
    let salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    let admin = new Admin({ username, 'password': hashedPassword });
    admin = await admin.save();
    res.status(200).json(admin);
}
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ err: errors.array() });

    
    let { username, password } = req.body;
    let admin = await Admin.findOne({ 'username': username })


    const isValid = await bcrypt.compare(password, admin.password);
    if (!admin || !isValid) {
        return res.status(400).json({ 'msg': 'Invalid Credentials' });
    }
    let obj = {
        username: admin.username

    };
    const SECRET_KEY = '15111983200722'
    const token = jwt.sign(obj, SECRET_KEY, { expiresIn: '20h' });
    res.status(200).json({ 'token :': token });





}