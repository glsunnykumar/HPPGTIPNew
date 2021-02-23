const mongoose = require('mongoose');
// Get the Schema constructor
var Schema = mongoose.Schema;

const gallerySchema = mongoose.Schema({
    GalleryTitle : {type:String,required : true},
    GalleryDescription : {type:String,required : true},
    GalleryImage :{type:String }
   
});

module.exports = mongoose.model('Gallery',gallerySchema);