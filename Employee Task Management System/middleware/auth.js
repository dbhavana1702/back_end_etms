const jwt = require('jsonwebtoken');
const auth = async (req, res, callback) => {
    try {
        /**I amreading the token from Authorization hear, which will 
    * be passed from postman and UI 
    * 
    */
        let token = req.header('Authorization');
        /** checking if token is available */
        if (!token)
            return res.status(400).json("token is not given");
        /** Split the token from Bearer keyword 
        * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhcnJ5IiwiaWF0IjoxNzQwMzg5NjQ1LCJleHAiOjE3NDAzOTMyNDV9.sOI7599MmLt7o4wMfGtHeH2bEdnafrUwLRLU3N4HNi8 */

        let actualToken = token.split(" ")[1];
        const SECRET_KEY = '15111983200722';
        let obj = jwt.verify(actualToken, SECRET_KEY);
        /** we use username(enclosed within obj) of User/Admin to create the token. 
         * now after this verification step, we get user obj back. 
         * from this obj, i can get username
         * NOTE: i need this username in my api, not here in auth
         */
        req.user = obj;
        callback();//goes auth,addadmin:auth->addAdmin



    }
    catch (err) {
        res.status(400).json({ err: 'err' });
    }

}
module.exports = auth;