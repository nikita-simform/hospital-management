const express = require("express");
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const api=require('./routes/api');
const cors=require('cors');

const app = express();
app.use(cors({
    origin:'http://localhost:5173'
}));
app.use(express.json()); //which will parse any incoming JSON from the body of any incoming request
app.use('/v1',api);

module.exports = app;
