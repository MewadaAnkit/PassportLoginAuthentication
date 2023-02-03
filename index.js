require('dotenv').config()
const express = require('express')
const app = express();
const Port = process.env.PORT || 3000;
const session = require('express-session')
const bcrypt = require('bcrypt')
const passport = require('passport');
const intializePassport = require('./passport-config');
const authenticate = require('passport')

intializePassport(passport);
app.set('view engine','ejs');
app.set('views',"views")
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())

const db = require('./server/connection')
const User = require('./server/model')


//routes
app.get('/',isLoggedIn,(req,res)=>{
    res.render('index',{user:req.user})
    
})
app.get('/login' , (req,res)=>{
    res.render('login')
})
app.get('/logout',(req,res)=>{
    if(req.user){
        req.logout(function(err){})
        res.redirect('/login')
    }
})
app.get('/register', (req,res)=>{
    res.render('register')
})



app.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/register',
    failureFlash:true,
}))

app.post('/register', async (req,res)=>{
    try{
          
           const user = new User({
            username:req.body.username,
            password:req.body.password
           })
           //console.log(user)
           user.save(user);
           res.redirect('/login')
    }catch{
        res.redirect('/register')

    }
})



function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/login');
}


app.listen(Port , ()=>{
    console.log('Server Started Successfully')
})