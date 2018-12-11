var express = require('express');
var router = express.Router();

router.get('/notes',(req,res) => {
    res.send('notes');
});

module.exports = router;