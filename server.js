const express = require("express");
const connectMongoDb = require("./connectMongo");
require("dotenv").config({ path: "./config/.env" });
const dataArray = require("./data");
const person = require("./personModel");

const app = express();

const Port = process.env.Port || 7000;

//Installing and setting up Mongoose-----------------------------------
// check the file in ./connectMongoDb.js

connectMongoDb();

//Create a person prototype-------------------------------------------
//check the file in ./personModel.js

//Create and Save a Record of a Model--------------------------------

let createAndSavePerson = function(done) {
    const person1 = new person({
        name: "Daniel",
        age: 24,
        favoriteFoods: ["Rice"],
    });

    person1.save((err, data) => {
        console.log(data)
        if (err) {
            done(err)
        }
        done (null, data);
    });
};

//Create Many Records with model.create()------------------------------

(async () => {
    try {
        const result = await person.create([
            { name: "Monday", age: 13, favoriteFoods: "Rice" },
            { name: "Bule", age: 20, favoriteFoods: "Yam" },
            { name: "Matthew", age: 29, favoriteFoods: "Ice-cream" },
    ]);
        console.log("Multiple records added successfully");
    } catch (error) {
        console.log(error);
    }
})();

// //Use model.find() to Search Your Database -----------------------------

(async () => {
    try {
        const result = await person.find({ name: "Monday" });
        console.log("Result of search : ", result);
    } catch (error) {
        console.log(error);
    }
})();

//Use model.findOne() to Return a Single Matching Document from Your Database ----------

(async () => {
    try {
        const result = await person.findOne({ name: "Blue" });
        console.log("Result of search with findone : ", result);
    } catch (error) {
        console.log(error);
    }
})();

//Use model.findById() to Search Your Database By _id--------------------

(async () => {
    try {
        const result = await person.findOne({ _id: "61633f443f90a6de87a1237c" });
        console.log("Result of search with Id : ", result);
    } catch (error) {
        console.log(error);
    }
})();

//Perform Classic Updates by Running Find, Edit, then Save ---------------

(async () => {
    try {
        const result = await person.findOne({ _id: "616343e13f90a6de87a1237f" });
        result.favoriteFoods.push("Ice-cream");
        result.markModified("favoriteFoods");
        await result.save();
    } catch (error) {
        console.log(error);
    }
})();

//Perform New Updates on a Document Using model.findOneAndUpdate()-------------

(async () => {
    try {
        const result = await person.findOneAndUpdate(
            { name: "Anthony" },
            { $set: { age: 40 } },
            { new: true }
        );
        console.log("Result of findOneAndUpdate : ", result);
    } catch (error) {
        console.log(error);
    }
})();

//Delete One Document Using model.findByIdAndRemove------------------------

(async () => {
    try {
        const result = await person.findByIdAndRemove({
            _id: "60fabf0f6064770808257df6",
    });
        console.log("Result of findByIdAndRemove : ", result);
    } catch (error) {
        console.log(error);
    }
})();

//MongoDB and Mongoose - Delete Many Documents with model.remove()------------

(async () => {
    try {
        person.remove({ name: "Sunday" }, function (err, res) {
            if (err) console.log(err);
            else console.log("Result of remove : ", res);
    });
    } catch (error) {
            console.log(error);
    }
})();

//Chain Search Query Helpers to Narrow Search Results--------------------

(async () => {
    try {
    await person
        .find({ favoriteFoods: "Meat" })
        .sort({ age: 1 })
        .limit(2)
        .select({ age: false })
        .exec()
        .then((doc) => console.log("The last result : ", doc))
        .catch((err) => console.log(err));
    } catch (error) {
    console.log(error);
    }
})();

//Creation of a listener for the app ------------

app.listen(Port, (err) => {
if (err) {
    throw err;
} 
else {
    console.log(`server is listening on port ${Port}`);
}
});