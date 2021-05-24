const userdb = require("../model/model");

const createUser = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message : "content cannot be empty"
        });
        return;
    }
    let user = new userdb({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status : req.body.status
    });
    user.save()
    .then(doc => {
        res.redirect("/");
    })
    .catch(err =>{
        res.status(500).send({
            message : "Some error while inserting"
        });
    });
};

const getUsers = (req,res) => {
    const {id} = req.query;
    if(id){
        userdb.findById(id)
        .then(user => {
            if(user){
                res.send(user);
            }else {
                res.status(404).send(`User with id ${id} not found`);
            }
        })
        .catch(err => {
            res.status(500).send({
                message : `Some error while reading user with id ${id}.`
            })
        })
        return;
    }
    userdb.find()
    .then(users => {
        res.send(users);
    })   
    .catch(err =>{
        res.status(500).send({
            message : "Some error while reading"
        });
    });
};

const updateUser = (req,res) => {
    if(!req.body){
        return res.status(400).send({
            message : "content cannot be empty"
        });
    }
    const id = req.params.id;
    userdb.findByIdAndUpdate(id,req.body,{useFindAndModify : false})
    .then(found => {
        if(!found){
            res.status(404).send({
                success : false,
                message : `User with ${id} not found`
            });
        }else {
            res.send(found);
        }
    })
    .catch(err => {
        res.status(500).send({
            message : "Error while updating data"
        });
    })
};

const deleteUser = (req,res) => {
    const id = req.params.id;
    userdb.findByIdAndDelete(id)
    .then(found => {
        if(!found){
            res.status(404).send({
                success : false,
                message : `User with ${id} not found`
            });
            return;
        }
        res.send(found);
    })
    .catch(err => {
        res.status(500).send({
            message : "Error while deleting data"
        });
    })
};

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
};