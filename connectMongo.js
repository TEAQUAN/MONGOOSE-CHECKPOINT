const mongoose = require("mongoose");

const connectMongoDb = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Db connected"))
    .catch(() => console.log(err));
};

module.exports = connectMongoDb;