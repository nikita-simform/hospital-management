const express = require("express");
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const api=require('./routes/api');
const cors=require('cors');
const path=require('path');
const app = express();
app.use(cors({
    origin:'http://localhost:5173'
}));
app.use(express.json()); //which will parse any incoming JSON from the body of any incoming request
app.use(express.static(path.join(__dirname,'..','public')))

app.use('/v1',api);
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'));
});
module.exports = app;
