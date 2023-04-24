const express = require("express");
const { signup,signin,logout } = require("./login.controller");
const {check}=require('express-validator');

const loginRouter = express.Router();

loginRouter.post('/signup',[
    check("firstName","First name should be atleast be 3 characters").isLength({min:3}),
    check("middleName","Middle name should be atleast be 3 characters").isLength({min:3}),
    check("lastName","Last name should be atleast be 3 characters").isLength({min:3}),
    check('email',"Email should be valid").isEmail(),
    check("password","Password at least should be 6 characters").isLength({min:6})
],signup);

loginRouter.post('/login',[
    check('email',"Email should be valid").isEmail(),
    check("password","Password at least should be 6 characters").isLength({min:6})
],signin)

loginRouter.get('/logout',logout)
module.exports = loginRouter;
