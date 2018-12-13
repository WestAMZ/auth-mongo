var express = require('express');
var router = express.Router();

router.get('/notes/add',(req,res) => {
    res.render('notes/new-note');
});
//Recepcionando datos
router.post('/notes/new-note',(req,res)=>{
    //en body vienen los valores enviados por post
    //console.log(req.body)
    const  {title,description} = req.body;
    //validaciones de los campos envidos
    const errors = [];
    if(!title)
    {
        errors.push({text:'Please write a valid title'});
    }
    if(!description)
    {
        errors.push({text:'Please write a valid description'});
    }
    if(errors.length>0)
    {
        res.render('notes/new-note',{
            errors,
            title,
            description
        });
    }
});

router.get('/notes',(req,res) => {
    res.send('notes');
});

module.exports = router;