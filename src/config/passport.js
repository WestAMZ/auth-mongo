const passport = require('passport');
const LocalStrategy = requiere('passport-local').LocalStrategy;

passport.use(new LocalStrategy({
    usernameField : 'email',
    async (email,password,done) =>{
        
    }
}));
