const mongoose = require('mongoose');
var studentsSchema = mongoose.Schema({
    name: {type:String,required:true},
    address:String,
    phones:[{}],
    studies:[String]
});
var students = mongoose.model('students', studentsSchema);
module.exports = students;