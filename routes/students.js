const Student = require('../models/students');

exports.addStudent = (req, res) => {
    Student.findOne({name:req.body.name}).then(function (resp) {
    if(!resp){
        let student=new Student(req.body);
        student.save()
            .then(resp => {res.status(200).jsonp('Your student is create correct')})
            .catch(err => {;res.status(500).send(`There was an error adding ${student.name}, please try again later. Error: ${err.message}`)});
    }
    else {
        res.status(200).send({message:`this name is already in use.`});
        }
});}
exports.getAllStudents = (req, res) => {
    Student.find({},["name","phones","studies"])
    .then(resp =>res.status(200).jsonp(resp))
    .catch(err => res.status(500).send(`There was an error, please try again later. Error: ${err.message}`));
}
exports.findStudent = (req, res) => {
    console.log(req.body)
    Student.find({name:req.params.name})
    .then(resp => res.status(200).jsonp(resp))
    .catch(err => res.status(500).send(`There was an error finding ${req.params.name}, please try again later. Error: ${err.message}`));
}
exports.deleteStudent = (req, res) => {
    Student.findByIdAndRemove({_id:req.params.name})
    .then(resp => res.status(200).jsonp(resp))
    .catch(err => res.status(500).send(`There was an error deleating ${req.body.name}, please try again later. Error: ${err.message}`));
}
exports.updateStudent = (req, res) => {
    Student.findById({_id:req.body._id})
        .then(model => {
            if (model) {
                model.update(req.body)
                    .then(resp => res.status(200).send({ message: `${req.body.name} successfully updated.` }))
            }
            else {
                res.status(200).send({ message: `Can't find ${req.body.name} to update with id: ${req.body.id} .` });
            }
        })
        .catch(err => res.status(500).send({ message: `There was an error updating ${req.body.name}, please try again later.`, error: err.message }));
}