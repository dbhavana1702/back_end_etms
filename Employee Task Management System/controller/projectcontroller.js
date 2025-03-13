const Admin = require("../model/admin");
const Project = require("../model/project");

exports.addProject = async (req, res) => {
    let user = req.user;
    console.log(user);
    let username = user.username;
    let admin = await Admin.findOne({ 'username': username });
    if (!admin)
        return res.status(401).json({ 'msg': `unauthorized acess for user :${username}` });

    let { title, shortDescription, startDate, estimatedEndDate, clientName, techStack } = req.body;
    let project = new Project({ title, shortDescription, startDate, estimatedEndDate, clientName, techStack });
    project = await project.save();
    res.status(200).json(project);

}
// exports.getAllProjects = async (req, res) => {
//     // const projects = await Project.find();
//     // res.json(projects);
//     let { page, size } = req.query;
//     page = parseInt(page) || 1;
//     size = parseInt(size) || 2;
//     //console.log(page + "---" + size)
//     /**
//      * size=2
//      * Algorithm
//      * when(page == 1) then (skip = 0 , [1,2])
//      * when(page == 2) then (skip = 2, [3,4])
//      * when(page == 3) then (skip = 4, [5,6])
//      */
//     let skip = (page - 1) * size;
//     const project = await Project.find().skip(skip).limit(size);
//     let totalRecords = await Project.countDocuments();
//     let totalPages = Math.ceil(totalRecords / size);
//     res.json(
//         {
//             'currentPage': page,
//             'totalRecords': totalRecords,
//             'data': project,
//             'totalPage': totalPages
//         }
//     );
// }
exports.getAllProjects = async (req, res) => {
    const projects = await Project.find();
    res.json(projects);

}
