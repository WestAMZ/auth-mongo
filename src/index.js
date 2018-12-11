const express = require('express');
const path = require('path');
const exphbs= require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

//Initializations
const app = express();
require('./database');
//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));//Extiende verbos http en forms
app.use(session({
    secret:'mysecretapp',//una palabra cualquiera para codificación
    resave:true,
    saveUninitialized:true
}));
//Global variables

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
//Static Files
app.use(express.static(path.join(__dirname,'public')));
//Server is listening

app.listen(app.get('port'),function()
{
    console.log("Server on port http://localhost:"+app.get('port'));
});