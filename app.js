var app = require('./server/lib/app');
app.listen(3000)

var path = require('path');
var express = require('express');
//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));


