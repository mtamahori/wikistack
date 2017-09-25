'use strict';

const express = require('express')
const mainRouter = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');

mainRouter.use('/wiki', wikiRouter);
mainRouter.use('/user', userRouter);


module.exports = mainRouter;

