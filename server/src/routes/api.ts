import express from "express";
import { ensureToken } from '../utils/accessToken';
import { loginRouter } from './login/login.router';
import { patientRouter } from './patient/patient.router';

const api = express.Router();
api.use('/', loginRouter);
api.use('/patients', ensureToken, patientRouter)
export { api };