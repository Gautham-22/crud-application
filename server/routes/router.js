const express = require("express");
const router = express.Router();
const axios = require("axios");
const {
    createUser,
    getUsers,
    updateUser,
    deleteUser
} = require("../controller/controller");
const { response } = require("express");

// Home 
router.get("/",(req,res) => {
    axios.get("http://localhost:3000/api/users")
    .then((response) => {
        res.render("index",{users : response.data});
    })
    .catch(err => {
        res.send(err);
    })
})

router.get("/add-user",(req,res) => {
    res.render("add_user");
})

router.get("/update-user",(req,res) => {
    console.log(req.query.id);
    axios.get(`http://localhost:3000/api/users?id=${req.query.id}`)
    .then(response => {
        res.render("update_user",{user : response.data});
    })
    .catch(err => {
        res.send(err);
    })
})

// CRUD 
router.post("/api/users",createUser);
router.get("/api/users",getUsers);
router.put("/api/users/:id",updateUser);
router.delete("/api/users/:id",deleteUser);

module.exports = router;