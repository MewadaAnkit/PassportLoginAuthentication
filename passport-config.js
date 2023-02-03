const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const User = require('./server/model')
module.exports = function(passport){
    
 passport.use(new LocalStrategy(async (username , password,done)=>{
    try {
        const user = await User.findOne({username:username});
           console.log("user found",user)
       if(!user) return done(null , false)

       if(user.password != password) return done(null, false)

       return done(null, user)
        
    } catch (error) {
        return done(error, false)
    }
      

    }));

    passport.serializeUser((user,done)=>{
        console.log('serializing user',user)
         done(null,user.id)
    })
    passport.deserializeUser(async (id,done)=>{
       try {
           const user = await User.findById(id)
           done(null, user)
       } catch (error) {
           done(error,false)
       }
   })
   
}
