const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('DB connection established');
    } catch (error) {
        console.error(error);
        throw new Error('Error when trying to establish a DB connection');
    }
}


module.exports = {
    dbConnection
};