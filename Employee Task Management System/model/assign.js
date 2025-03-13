const mongoose=require('mongoose');
const assignSchema=new mongoose.Schema(
    {
        employee:{ type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true},
        task:{ type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true} 
    }
);
const Assign=mongoose.model("Assign",assignSchema);
module.exports=Assign;
//Bridge Schema