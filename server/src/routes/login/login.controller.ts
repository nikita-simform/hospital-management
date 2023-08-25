import { isExistingUser, doSignup } from "../../models/user/user.model";
import { validationResult } from "express-validator";
import { httpResponse, httpErrorResponse } from "../../utils/httpResponse";
import { createToken } from "../../utils/accessToken";
import { Request, Response } from "express";

export async function signup(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return httpResponse(res, 400, { error: errors.array()[0].msg }, null);
    }
    const user = req.body;

    const isUserExists = await isExistingUser(user.email);
    if (isUserExists) {
      return httpResponse(res, 400, { error: "User already exists" }, null);
    }

    const newUser = await doSignup(user);
    return httpResponse(res, 201, 'User created successfully', { newUser });
  }
  catch (error) {
    return httpErrorResponse(res, error);
  }
}

export async function signIn(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array()[0].msg,
      });
    }

    const { email, password } = req.body;

    const existingUser = await isExistingUser(email);

    if (!existingUser) {
      return httpResponse(res, 400, { error: "Email was not found" }, null);
    }

    if (!existingUser.authenticate(password)) {
      return httpResponse(res, 400, { error: "Incorrect password" }, null);
    }

    const token = createToken({ _id: existingUser._id });
    // Create a Date object
    const currentDate = new Date();

    // Define the number of days you want to add
    const daysToAdd = 1;

    // Calculate the new date by adding the specified number of days
    const newDate = new Date(currentDate);
    
    newDate.setDate(currentDate.getDate() + daysToAdd);
    res.cookie("token", token, { expires: newDate});

    return httpResponse(res, 200, 'Login Successful', {
      token,
      user: {
        id: existingUser._id,
        name: existingUser.firstName + " " + existingUser.lastName,
        email: existingUser.email,
      }
    });
  }
  catch (error) {
    return httpErrorResponse(res, error);
  }
}

export function logout(req: Request, res: Response) {
  res.clearCookie("token");
  return httpResponse(res, 200, 'User logged out successfully', null);
}

