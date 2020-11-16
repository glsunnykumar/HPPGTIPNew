const path = require("path");
const express = require('express');
//const bodyParse = require('body-parser');
//const mongoose = require('mongoose');

const app = express();
mongoose.connect("mongodb://localhost:27017/shoptiserdb", { useNewUrlParser: true })
//mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false')
    .then(
        () => {
            console.log('connected to database');
        })
    .catch(() => {
        console.log('connection failed');
    });

app.use(bodyParse.json());
app.use("/images",express.static(path.join("backend/images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PATCH,DELETE,PUT,OPTIONS"
    );
    next();
});

// app.use("/api/cat",categoryRoutes);    
// app.use("/api/student",studentsRoutes);
// app.use("/api/product",productRoutes);  


module.exports = app;