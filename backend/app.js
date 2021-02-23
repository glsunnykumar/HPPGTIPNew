const path = require("path");
const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const metaRoutes = require("./routes/metas")
const memberRoutes = require("./routes/members")
const notificationRoutes = require("./routes/notification")
const galleryRoutes = require("./routes/gallery")
const app = express();
mongoose.connect("mongodb://localhost:27017/HPPGTIPDB", { useNewUrlParser: true })
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

// app.use((req, res, next) => {
//     // res.setHeader("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Headers", "*");
//     // res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');

//     // res.setHeader('Access-Control-Allow-Origin' , "*");
//     // res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     // res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     // res.append('Access-Control-Allow-Credentials', true);

//  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Content-Type,Accept,application/pdf, Access-Control-Allow-Headers, Access-Control-Expose-Headers, Content-Disposition,   Authorization, X-Requested-With",
//         //"Origin,X-Requested-With,Content-Type,Accept,application/pdf"
//     );
//     res.setHeader(" Access-Control-Allow-Credentials","true");
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET,POST,PATCH,DELETE,PUT,OPTIONS,FETCH"
//     );
   
//     next();
// });

 app.use("/api/meta",metaRoutes);  
 app.use("/api/member",memberRoutes);    
 app.use("/api/notification",notificationRoutes);
 app.use("/api/gallery",galleryRoutes);
// app.use("/api/product",productRoutes);  


module.exports = app;