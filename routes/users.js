var express = require('express');
var router = express.Router();
const User = require('../models/User');
const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { allusers, newuser, edit, deleteuser, login } = require('../controllers/usercontroller');
//comparing secret and generating token
function autMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401).JSON({ message: 'No token provided' });
    const token = authHeader.split(' ')[1];
    JWT.verify(token,JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403).JSON({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}
// GET /users - Retrieve all users
router.get('/',allusers);
// POST /users - Create a new user
router.post('/', newuser);
//put edit user by id
router.put('/:id',autMiddleware,edit);
// Delete user by id
router.delete('/:id',autMiddleware,deleteuser);
//login route to be added 
router.post('/login',login);


module.exports = router;