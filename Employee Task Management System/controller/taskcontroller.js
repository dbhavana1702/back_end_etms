const Admin = require("../model/admin");
const Project = require("../model/project");
const Task = require("../model/task");

exports.addTask = async (req, res) => {
    const pid = req.params.pid;
    let { title, shortDescription, estimatedEndDate } = req.body;
    let project = await Project.findById(pid);
    if (!project)
        return res.status(400).json({ 'msg': "Invalid project Id given.." });
    let task = new Task({ title, shortDescription, estimatedEndDate, 'project': project._id });
    task = await task.save();
    return res.json(task);
}
exports.getAllTasks = async (req, res) => {
    // let obj = req.user;//getting the username from auth without decoding the username again
    // let username = obj.username;//here in obj it contain details like iat and exp and username..we require only username

    // let admin = await Admin.findOne({ 'username': username });
    // if (!admin)
    //     return res.status(401).json({ 'msg': 'Unauthorized' });

    let tasks = await Task.find().populate('project');
    res.json(tasks);
}
// exports.getTaskById = async (req, res) => {
//     try {
//         let id = req.params.id;
//         const project = await Project.findById(id)
//         if (!project)
//             res.status(400).json({ 'msg': 'Invalid project id' });
//         const task = await Task.find({ '_id': id })
//         
//         res.status(200).json(tasks)
//     }
//     catch (err) {
//         res.status(400).json('Error in api')
//     }
// }

exports.updateTask = async (req, res) => {
    try {
        let id = req.params.id;
        let newObj = { $set: req.body }; // Correctly format update object
        let updatedTask = await Task.findByIdAndUpdate(id, newObj);

        if (!updatedTask) {
            return res.status(400).json({ 'msg': `Invalid ID: ${id}` });
        }
        res.status(200).json({ 'msg': 'Task archived successfully!', updatedTask });
    } catch (err) {
        res.status(400).json({ 'msg': `Error in API: ${err.message}` });
    }
};
