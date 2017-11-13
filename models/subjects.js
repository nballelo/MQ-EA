const mongoose = require('mongoose');
var subjectsSchema = mongoose.Schema({
    name: {type:String,required:true,index:{unique:true}},
    studies:{type:String,required:true},
    quatrimestre:{type:String,required:true},
    students: [{type:mongoose.Schema.Types.ObjectId,ref:'students'}]//
});
var subjects = mongoose.model('subjects', subjectsSchema);
module.exports = subjects;