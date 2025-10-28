var express = require('express');
var router = express.Router();
const User = require('../models/User');
const { allusers, newuser, edit, deleteuser } = require('../controllers/usercontroller');
// GET /users - Retrieve all users
router.get('/',allusers);
// POST /users - Create a new user
router.post('/', newuser);
//put edit user by id
router.put('/:id',edit);
// Delete user by id
router.delete('/:id',deleteuser);

module.exports = router;