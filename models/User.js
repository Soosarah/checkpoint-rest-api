const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    grade: {    
        type: String,
        required: true
    },
    scores: {
        type: [Number],
        required: true  
    }
});
module.exports = mongoose.model('User', userSchema);

