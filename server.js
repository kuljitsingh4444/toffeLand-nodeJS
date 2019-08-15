const express = require('express');
let bParser = require('body-parser');
let path = require('path');
let app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.use(bParser.json());
app.use(bParser.urlencoded({
    extended: false
}));

app.listen(8000, function () {
    console.log('i am server side');
    console.log('server running on port 8000');
})