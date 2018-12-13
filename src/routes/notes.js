const express = require('express');
const router = express.Router();
// Importacion de modelo (clase)
const Note = require('../models/Notes')
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
    else
    {
        const newNote = new Note({title,description});
        console.log(newNote);
        res.send('Ok');
    }
});

router.get('/notes',(req,res) => {
    res.send('notes');
});

module.exports = router;