const express = require('express');
const app = express();
const path = require('path');
const exphbs= require('express-handlebars');
//Settings
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout:'',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:'',
    extname:''
}));
//Middlewares

//Global variables

//Routes

//Static Files

//Server is listening

app.listen(app.get('port'),function()
{
    console.log("Server on port https://localhost:"+app.get('port'));
});