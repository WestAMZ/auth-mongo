const router = require('express').Router();
router.get('/users/signin',(req,res) => {
    res.render('users/signin');
});
router.get('/users/signup',(req,res) => {
    res.render('users/signup');
});

router.post('/users/signup',async(req,res) => {
    const  {name,email,password,confirm_password}  = req.body;

    res.render('users/signup');
});
module.exports = router;