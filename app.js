'use strict';

const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const fs = require('fs');
const mainRouter = require('./routes/index')
const models = require('./models')
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', { noCache: true });

app.use('/', mainRouter);


// pg: 7.3.0
models.db.sync( {force: true} )
    .then(function() {
        app.listen(3000, function() {
        console.log('Listening on Port 3000');
        })
    })
    .catch(function(err) {
        console.error(err);
    });
