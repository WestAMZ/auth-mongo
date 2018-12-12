var express = require('express');
var router = express.Router();

router.get('/notes/add',(req,res) => {
    res.render('notes/new-note');
});
//Recepcionando datos
router.post('/notes/new-note',(req,res)=>{
    console.log(req.body)
    res.send('ok');
});

router.get('/notes',(req,res) => {
    res.send('notes');
});

module.exports = router;