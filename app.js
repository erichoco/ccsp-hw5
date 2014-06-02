
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var passport = require('passport');

// require('./config/db'); // TODO [DB] : Connect to database
// require('./config/passport'); // TODO [FB] : Passport configuration

var app = express();
// var Vote = mongoose.model('Vote'); // TODO [DB] : Get Vote model

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser(process.env.COOKIE_SECRET));
app.use(express.session());

// https://github.com/jaredhanson/passport#middleware
app.use(passport.initialize());
app.use(passport.session());
// Session based flash messages
app.use(flash());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
  var messages = req.flash('info');
  res.render('index', {messages: messages});
});

/* Stores vote option in session and invokes facebook authentication */
app.post('/vote', function(req, res, next){
  // Stores the voted option (conveted to number) into session
  req.session.vote = +req.body.vote;

  res.redirect('/result');

  /* TODO [FB] : Redirect to passport auth url! */
  // Directly invoke the passport authenticate middleware.
  // Ref: http://passportjs.org/guide/authenticate/
  //
  // passport.authenticate('facebook')(req, res, next);
});

// TODO [FB]: Facebook callback handler
// Ref: https://github.com/jaredhanson/passport-facebook/blob/master/examples/login/app.js#L100
//
// app.get('/fbcb', passport.authenticate('facebook', {
//   successRedirect:'/result',
//   failureRedirect: '/'
// }));

app.get('/result', function(req, res){

  var vote = req.session.vote, // The voted item (0~6)
      fbid = "" + Math.random();    // Facebook ID. (Fake)
      // fbid = req.user && req.user.id; // TODO [FB]: Get user from req.user

  // Delete the stored session.
  //
  delete req.session.vote;
  req.logout(); // Delete req.user

  // Redirect the malicious (not voted or not logged in) requests.
  //
  if( vote === undefined || fbid === undefined ){
    req.flash('info', "請先在此處投票。");
    return res.redirect('/');
  }

  /*
    TODO [DB] : Replace the mock results with real ones.
    Please record the user vote into database.
    If the user already exists in the database, redirect her/him to '/'
  */

  //
  // var vote = new Vote({vote: vote, fbid: fbid});
  // vote.save(function(err, newVote){
  //   if( err ){
  //     req.flash('info', "你已經投過票囉！");
  //     return res.redirect('/');
  //   }
  //
  //   ... ...
  //
       res.render('result', {
         votes: [18.1, 12.5, 42.44445, 21.3, 1.3, 2.5, 1.85555] // Percentages
       });
  //
  // });

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
