const Admin = require("../model/admin");
const Employee = require("../model/employee");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
exports.getUserInfo=async(req,res)=>
{
    try{
        let obj=req.user;
        let username=obj.username;
        let admin=await Admin.findOne({'username':username});
        if(admin)
            return res.json(admin);
        let employee=await Employee.findOne({'username':username});
        if(employee)
            return res.json(employee)
        res.status(400).json({'msg':'login denied!!'})

    }
    catch(err)
        {return res.status(400).json(err)}
}
exports.login=async(req,res)=>{
    let{username,password}=req.body;
     /**Check if this belongs to ADMIN */
    /** I will fetch Admin details from Db using given username */
    let admin=await Admin.findOne({'username':username});
    if(admin)
    {
         //generate the token and return token
        /** check the password
        * this password given in api is a plain text password: admin@123
        * the password saved in the DB is a hashed version of this password 
        * use bcrypt to compare plain text and hashed password   
        */
       let isValid=await bcrypt.compare(password,admin.password);
       if(!isValid)
            return res.status(400).json({'msg':'Invalid Credentials'});
        /** since i have verified username and password, 
             * its time to generate the token */
        const SECRET_KEY = '15111983200722';
        let adminObj={
            'username':admin.username
        }
        const token=jwt.sign(adminObj,SECRET_KEY,{'expiresIn':'20h'});

        return res.json({
            'token':token,
            'role':admin.role
        })
    }
    /**Check if this belongs to Employee */
    /** I will fetch Employee details from Db using given username */  
    let employee=await Employee.findOne({'username':username});
    if(employee)
    {
        /**compare & check the password */
        let isValid=await bcrypt.compare(password,employee.password);
        if(isValid===undefined)
            return res.status(400).json({'msg':'Invalid Credentials'});
        //generate the token and return the token
        const SECRET_KEY = '15111983200722';
        let employeeObj={
            'username':employee.username
        };
        const token=jwt.sign(employeeObj,SECRET_KEY,{'expiresIn':'1h'});
        return res.json({'token':token,'role':employee.role})




    }
    return res.status(400).json({'msg':'Invalid Credentials!!!!'});
       
}