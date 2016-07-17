'use strict';

const express = require('express');
const winston = require('winston');
// const helmet = require('helmet');
const nodeAppServer = require('./node-app-server');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const db = require('./db');
// mongoose.connect(db.url);   //--put back in

/**
 * Heroku-friendly production http server.
 *
 * Serves your app and allows you to proxy APIs if needed.
 */
const app = express();
const PORT = process.env.PORT || 9090;

// Enable various security helpers.
// app.use(helmet());
// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(function (error, request, response, next) {
  console.error(error.stack);
  response.status(400).send(error.message);
});


var webpack = require('webpack');
var webpackConfig = require('../../webpack.config');
var compiler = webpack(webpackConfig);


var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {colors: true,},
  historyApiFallback: true,
}));

app.use(webpackHotMiddleware(compiler, {
  log: winston.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}));

// var testRoute = require('./testRoute')(app);
// app.use('/test',testRoute);
app.get('/test',function(req,res){
  console.log("we GOOD!");

  res.json('We Good!');
});

// Serve the distributed assets and allow HTML5 mode routing. NB: must be last.
// nodeAppServer(app); //for production

// Start up the server.
app.listen(PORT, (err) => {
  if (err) {
    winston.error(err);
    return;
  }
  winston.info(`Listening on port ${PORT}`);
});
