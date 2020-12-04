const mongoose = require('mongoose');
// Get the Schema constructor
var Schema = mongoose.Schema;

const notificationSchema = mongoose.Schema({
    title : {type:String,required : true},
    description :{type:String},
    file : {type:String,required : true},
    date :{type:String,required:true}
   
});

module.exports = mongoose.model('Notification',notificationSchema);