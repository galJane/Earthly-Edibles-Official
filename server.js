const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const pagesRouter = require('./controller/pages');

const mongoose = require('mongoose');

const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'));

app.use('/', pagesRouter);






mongoose.connect('mongodb+srv://root:root@cluster0.tuzoa.mongodb.net/ShoppingDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(5000, () => {
            console.log('MongoDB Atlas connection success... and Express server is running');
        });
    })



/*
mongoose.connect('mongodb://localhost:27017/ShoppingDB', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(5000, () => {
            console.log('MongoDB connection success... and Express server is running');
        });
    })

*/