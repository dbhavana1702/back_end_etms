const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema(
    {
        username: { type: String, required: false },
        message: { type: String, required: true },
        commentDate: { type: Date, default: Date.now },
        task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true }

    }

)
const Comments = mongoose.model("Comments", commentSchema)
console.log("Schema created")
module.exports = Comments;