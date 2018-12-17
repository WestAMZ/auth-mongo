const router = require('express').Router();
router.get('/users/signin',(req,res) => {
    res.render('users/signin');
});
router.get('/users/signup',(req,res) => {
    res.render('users/signup');
});

router.post('/users/signup',async(req,res) => {
    
    const  {name,email,password,confirm_password}  = req.body;
    const errors = []
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
        res.render('users/signup',{error: errors,name,email,password,confirm_password});
    }
    else
    {
        res.send('OK');
    }
    
    //res.render('users/signup');
});
module.exports = router;