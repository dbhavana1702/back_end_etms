const Comments = require("../model/comments");
const Employee = require("../model/employee");

exports.addComments = async (req, res) => {
    try {
        let obj = req.user;
        let usernam = obj.username;
        let employee = await Employee.findOne({ 'username': usernam })
        if (!employee)
            return res.status(400).json({ 'msg': 'Could not find Employee' })
        let { message, commentDate, task } = req.body;
        let comment = new Comments({ 'username': usernam, message, commentDate, task })
        comment = await comment.save();
        return res.status(200).json(comment)
    }
    catch (err) {
        res.status(400).json('err')
    }

}

exports.getComments = async (req, res) => {
    try {
        let comment = await Comments.find()
        return res.status(200).json(comment)
    }
    catch (err) {
        return res.status(400).json(err.message)
    }
}
exports.getCommentById = async (req, res) => {
    try {
        const id = req.params.id;
        const comments = await Comments.find({ 'task': id });
        res.status(200).json(comments)
    }
    catch (err) {
        res.status(400).json({ 'msg': 'Error in api' })
    }
}