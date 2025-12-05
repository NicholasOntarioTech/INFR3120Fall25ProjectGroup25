var express = require('express');
var router = express.Router();
const passport = require('passport');
require('dotenv').config();
let userModel = require('../models/user')
let User = userModel.User;
const {ensureLoggedIn} = require('../config/auth');

/* GET home page. */
// 127.0.0.1 (/)
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

//Get login
router.get('/login', function(req,res,next){
  if(!req.user)
  {
    res.render('Authentication/login',
      {
      title:'Login',
      message: req.flash('loginMessage')
    })
  }
  else
    {
    return res.redirect("/")
  }
});
//Post login
router.post('/login', function(req,res,next){
  passport.authenticate('local', (err, user, info)=>{
    if(err){
      return next(err);
    }
    if(!user){
      req.flash('loginMessage', 'AuthenticationError');
      return res.redirect('/login')
    }
    req.login(user,(err)=>{
      if(err){
      return next(err);
    }
    return res.redirect("/cars")
    })
  })(req,res,next)
});
//Get register
router.get('/register', function(req,res,next){
  if(!req.user)
  {
    res.render('Authentication/register',
      {
      title:'Register',
      message: req.flash('registerMessage')
    })
  }
  else
    {
    return res.redirect("/")
  }
});
//Post register
router.post('/register', function(req,res,next){
let newUser = new User({
  username: req.body.username,
  //username: req.body.password,
  email: req.body.email,
  displayName: req.body.displayName
})
User.register(newUser, req.body.password, (err)=>{
  if(err)
  {
    console.log("Error inserting the new user")
    if (err.name=="UserExistingError")
    {
      console.log("Error - User exists")
      req.flash('registerMessage', 'Registration error: User already taken')
    }
    return res.render('Authentication/register',
      {
        title:"Register",
        message:req.flash('registerMessage')
      }
    )
  }
  else{
    return passport.authenticate('local')(req,res,()=>{
      res.redirect('/cars')
    })
  }
})
});
router.get('/logout',function(req,res,next){
  req.logout(function(err)
  {
    if(err)
    {
      return next(err)
    }
  })
  res.redirect("/");
})

//redirects to the corresponding third party login page and sends the user back to either the login page on failure, or the homepage on success
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
      res.redirect('/');
  }
);

router.get('/auth/github',
  passport.authenticate('github', {scope: ['user:email'] })
);

router.get('/auth/github/callback',
  passport.authenticate('github', {failureRedirect: '/login'}),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login'}),
  (req, res) => {
    res.redirect('/');
  }
);


module.exports = router;

