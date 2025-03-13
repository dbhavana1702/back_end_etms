const Assign = require("../model/assign");
const Employee = require("../model/employee");
const Task = require("../model/task");

exports.assignTaskToEmployee = async (req, res) => {
    let { eid, tid } = req.body;
    let employee = await Employee.findById(eid);
    if (!employee)
        return res.status(400).json({ 'msg': 'Employee id invalid' });
    let task = await Task.findById(tid);
    if (!task)
        return res.status(400).json({ 'msg': 'Task id invalid' });
    let assign = new Assign({ 'employee': eid, 'task': tid });
    assign = await assign.save();
    res.status(200).json(assign);

}
