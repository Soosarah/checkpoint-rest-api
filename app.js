require('dotenv').config();
const express = require('express');
const {connectDB} = require('./config/db.js');

const app = express();

// Connection to database
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// Server

app.get('/', (req, res) => {
    res.send('Welcome to the User API');
}
);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
module.exports = app;