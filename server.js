const express = require('express');
let bParser = require('body-parser');
let path = require('path');
let app = express();
const execute = require('./utils');

//TODO : constarints, user convenience , double space!, spearate file ?;

app.use(express.static(path.join(__dirname, '/public')));

app.use(bParser.json());
app.use(bParser.urlencoded({
    extended: false
}));

app.listen( 8000,()=> serverCallBack() )

const serverCallBack = () => {
    //Server start mesage
    console.clear();
    console.log('\nServer running on port 8000\n');
    //execute code from here
    execute();
}