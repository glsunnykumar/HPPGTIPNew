const mongoose = require('mongoose');
// Get the Schema constructor
var Schema = mongoose.Schema;

const memberSchema = mongoose.Schema({
    MemberName : {type:String,required : true},
    MemberRole :{type:String,required :true},
    MemberDistrict : {type:String,required : true},
    MemberImage :{type:String }
   
});

module.exports = mongoose.model('Member',memberSchema);

