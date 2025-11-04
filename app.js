require('dotenv').config();
const path =require('path');
const express = require('express');
const {connectDB} = require('./config/db.js');
const cors = require('cors');
const corsOption={
    origin:['http://localhost:5174','https://checkpoint-rest-api-6orp.onrender.com'],
    credentials:true,
};
// Connection to database
connectDB();


const app = express();
app.use(cors(corsOption)); 


app.use(express.json());
app.use(express.urlencoded({ extended: false }));







// Routes
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// Server


app.use(express.static(path.join(__dirname,'dist')));
app.use(express.static('dist',{
    maxAge:'0',
    etag:false
}));
app.get(/.*/,(req,res)=>{
    res.sendFile(path.join(__dirname,'dist','index.html'))
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports = app;
