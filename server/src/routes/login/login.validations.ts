import { check } from 'express-validator';

export const validateSignUpRequest = () => {
    return [
        check("firstName", "First name should be at least 3 characters long").isLength({ min: 3 }),
        check("lastName", "Last name should be at least be 3 characters long").isLength({ min: 3 }),
        check('email', "Email should be valid").isEmail(),
        check("password", "Password should be at least 6 characters long").isLength({ min: 6 })
    ]
}

export const validateLoginRequest = () => {
    return [
        check('email', "Email should be valid").isEmail(),
        check("password", "Password should be at least 6 characters long").isLength({ min: 6 })
    ]
}