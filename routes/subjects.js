const Subjects = require('../models/subjects');
const Students= require('../models/students');

exports.addSubjects = (req, res) => {
    Subjects.findOne({name:req.body.name}).then(function (resp) {
        if(!resp){
            let subject=new Subjects(req.body)
            subject.save(req.body)
                .then(resp => res.status(200).jsonp(`Your subject is create correct.`))
                .catch(err => res.status(200).send(`There was an error adding ${subject.name}, please try again later. Error: ${err.message}`));
        }
        else
            res.status(200).jsonp(`this name is already in use.`);
    })
}

exports.getAllSubjects = (req, res) => {
    Subjects.find({},'name')
    .then(resp => res.status(200).jsonp(resp))
    .catch(err => res.status(500).send(`There was an error adding ${subject.name}, please try again later. Error: ${err.message}`));}

exports.findSubjectsByName = (req, res,conditions) => {
    Subjects.find({name:req.params.name}).populate('students','name')
    .then(resp => res.status(200).jsonp(resp))
    .catch(err => {res.status(500).send(`There was an error adding ${subject.name}, please try again later. Error: ${err.message}`)});}

exports.findSubjectsByStudies = (req, res,conditions) => {
    Subjects.find({studies:req.params.name}).populate('students','name')
        .then(resp => res.status(200).jsonp(resp))
        .catch(err => {res.status(500).send(`There was an error adding ${subject.name}, please try again later. Error: ${err.message}`)});}

exports.findSubjectsByQuatrimestre = (req, res,conditions) => {
    Subjects.find({quatrimestre:req.params.name}).populate('students','name')
        .then(resp => res.status(200).jsonp(resp))
        .catch(err => {res.status(500).send(`There was an error adding ${subject.name}, please try again later. Error: ${err.message}`)});}

exports.deleteSubject = (req, res) => {
    Subjects.findByIdAndRemove({_id:req.params.name})
    .then(resp => res.status(200).jsonp(resp))
    .catch(err => res.status(500).send(`There was an error deleating ${subject.name}, please try again later. Error: ${err.message}`));
}

exports.updateSubject = (req, res) => {
    Subjects.findById({_id:req.body._id}).exec()
        .then((model) => {
            if (model) {
                //var model = updateModel(model, req.body);
                model.update(req.body)
                    .then(resp => res.status(200).send({ message: `${req.body.name} successfully updated.` }))
            }
            else {
                res.status(200).send({ message: `Can't find ${req.body.name} to update with id: ${req.body.id} .` });
            }
        })
        .catch(err => res.status(500).send({ message: `There was an error updating ${req.body.name}, please try again later.`, error: err.message }));
}