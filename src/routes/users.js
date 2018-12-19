const router = require('express').Router();
const User = require('../models/User')
router.get('/users/signin',(req,res) => {
    res.render('users/signin');
});
router.get('/users/signup',(req,res) => {
    res.render('users/signup');
});

router.post('/users/signup',async(req,res) => {
    
    const  {name,email,password,confirm_password}  = req.body;
    const errors = []
    if(name.length <= 0)
    {
        errors.push({text:'Please Insert Your Name'})
    }
    if(password != confirm_password)
    {
        errors.push({text:'Password do not match'});
    }
    if(password.length < 4)
    {
        errors.push({text:'Password must be at least 4 characters'});
    }
    if(errors.length > 0)
    {
        res.render('users/signup',{errors,name,email,password,confirm_password});
    }
    else
    {
        //Validacion de correos repetidos
        const emailUser  = User.findOne({email : email});
        if(emailUser )
        {
            req.flash('error_msg','The email is already in use')
        }
        const newUser = new User ({name,email,password});
        console.log(newUser);
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg','You are registered');
        res.redirect('/users/signin')
    }
    
    //res.render('users/signup');
});
module.exports = router;