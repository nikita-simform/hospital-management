import express from "express";
import { signup,signIn,logout } from "./login.controller";
import { validateSignUpRequest, validateLoginRequest } from "./login.validations";

const loginRouter = express.Router();

loginRouter.post('/signup',validateSignUpRequest(),signup);
loginRouter.post('/login',validateLoginRequest(),signIn);
loginRouter.get('/logout',logout);

export{loginRouter};
