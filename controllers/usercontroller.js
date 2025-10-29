const User = require("../models/User");
  const bcrypt = require('bcrypt');
  const JWT = require('jsonwebtoken');


 const allusers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const newuser=async (req, res) => {
      //password hashing 
  
    const saltRounds = 10;
    const plainPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    console.log('Hashed Password:', hashedPassword);
  
    const user = new User({
        name: req.body.name,
        age: req.body.age,
        grade: req.body.grade,
        scores: req.body.scores,
        password: hashedPassword
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
  
}


const edit=async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body
, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteuser=async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const login=async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne
         ({ name: name });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } 
          //password comparison
        const match = await bcrypt.compare(password, user.password);

        if (match) {
             //token generation
        const token =JWT.sign(
            { id: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
     
         res.json({ message: 'Login successful' ,token});
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
module.exports={allusers, newuser, edit,deleteuser,login};