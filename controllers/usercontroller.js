const User = require("../models/User");

 const allusers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const newuser=async (req, res) => {
    const user = new User({
        name: req.body.name,
        age: req.body.age,
        grade: req.body.grade,
        scores: req.body.scores,
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
module.exports={allusers, newuser, edit,deleteuser};