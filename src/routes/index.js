var express = require('express');
var router = express.Router();

router.get('/',(req,res) => {
    res.send('index');
});
router.get('/about',(req,res) => {
    res.send('about');
});
module.exports = router;