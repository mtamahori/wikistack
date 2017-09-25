const express = require('express');
const wikiRouter = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');
const Page = models.Page;
const User = models.User;



wikiRouter.get('/', function (req, res, next) {
    // res.redirect('/');
  Page.findAll()
    .then(function(pages){

        res.render('./../views/index', {pages: pages});
    })
    .catch(next);
});

wikiRouter.get('/add', function (req, res, next) {
    res.render('./../views/addpage')

});

wikiRouter.get('/:urlTitle', function(req, res, next) {
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        }
    })
    .then(function(foundPage){
        // res.json(foundPage)
        res.render('./../views/wikipage', {page: foundPage})
    })
    .catch(next);
});

wikiRouter.post('/', function (req, res, next) {
    // res.send('/ post', req.body)
    // res.json(req.body.title);

    User.findOrCreate({
        where: {
            name: req.body.author,
            email: req.body.email
        }
    })
    .then(function(foundUser) {

    const user = foundUser[0];

    const page = Page.build({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,
    });

    return page.save()
        .then( function(savedPage){
            return savedPage.setAuthor(user);
        });
    })
        .then(function(savedPage){
            res.redirect(savedPage.route);
        })
        .catch(next);
});

module.exports = wikiRouter;

