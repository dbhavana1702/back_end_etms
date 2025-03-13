const mongoose = require('mongoose');
const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb+srv://Bhavana:Bhavana4143@trainingcluster.ksz6q.mongodb.net/etms?retryWrites=true&w=majority&appName=trainingCluster');
        //Connecting String
        console.log("DB is connected");
    }
    catch (err) {
        console.log(err);
    }
    // finally {
    //         mongoose.connection.close();
    //         console.log('DB connection is closed');
    //     }
}
module.exports = dbConnect;
//mongoose help us to connect to do programmatically and let us perform db ops