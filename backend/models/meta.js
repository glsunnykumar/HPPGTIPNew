const mongoose = require('mongoose');
// Get the Schema constructor
var Schema = mongoose.Schema;

const metaSchema = mongoose.Schema({
    title : {type:String,required : true},
    description :{type:String},
    welcomeTitle : {type:String,required : true},
    welcomeDescription :{type:String,required:true},
    imageFaviconPath :{type:String },
    imageIconPath :{type:String }
   
});

module.exports = mongoose.model('Meta',metaSchema);