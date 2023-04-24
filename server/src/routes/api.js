const express=require('express');
const { ensureToken } = require('./login/login.controller');
const loginRouter=require('./login/login.router');
const patientRouter = require('./patient/patient.router');

const api=express.Router();
api.use('/',loginRouter);
api.use('/patients',ensureToken,patientRouter)
module.exports=api;