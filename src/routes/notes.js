const express = require('express');
const router = express.Router();
// Importacion de modelo (clase)
const Note = require('../models/Notes')
router.get('/notes/add',(req,res) => {
    res.render('notes/new-note');
});
//Recepcionando datos
//Con la palabra async establecemos que dentro de la función habran metodos asincronos , que se indicaran con prefijo await
router.post('/notes/new-note',async(req,res)=>{
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
        //Metodo asincrono (denotado por await)
        await newNote.save();
        req.flash('success_msg','Note Added Succesfully');
        res.redirect('/notes');
    }
});

router.get('/notes',async(req,res) => {
    const notes = await Note.find().sort( {date:'asc'});
    res.render('notes/all-notes',{notes});
    //res.send('notes');
});

router.get('/notes/edit/:id',async (req,res)=>
{
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note',{note});
});

router.put('/notes/edit-note/:id',async (req,res)=>
{
    const {title,description} = req.body;
    await Note.findByIdAndUpdate(req.params.id,{title,description});
    req.flash('success_msg','Note Update Succesfully');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id',async (req,res)=>
{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Note Deleted Succesfully');
    res.redirect('/notes');
});
module.exports = router;