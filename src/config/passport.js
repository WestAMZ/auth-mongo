const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const User = require('../models/User'); 

passport.use(new LocalStrategy({
    usernameField : 'email'},
    async (email,password,done) =>{
        const user = await User.findOne({email:email});
        if(!user)
        {
            //done metodo de terminacion de autentificación
            // err , usuario , mensaje
            return done(null,false,{message:'Not user found'});
        }
        else
        {
            //Verificación de contraseña
            const match = user.matchPassword(password);
            if(match)
            {
                return done(null,user)
            }
            else
            {
                return done(null,false,{message:'Incorrect Password'});
            }
        }
    }
));

//Almacenamiento de usuario en sesión
passport.serializeUser((user,done)=>
{
    done(null,user,id);
});

//Obtención de usuario dado una sesión
passport.deserializeUser((id,done)=>
{
    User.findById(id,(err,user)=>
    {
        done(err,user);
    });
});
