import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");
import { httpResponse } from "./httpResponse";


export function createToken(data: any) {
    return jwt.sign(data, process.env.SECRET, { expiresIn: process.env.TOKEN_EXPIRY_TIME });
}

function getTokenFromRequestHeader(req: Request) {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader != undefined) {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        return bearerToken;
    }
    return null;
}
export function ensureToken(req: Request, res: Response, next: NextFunction) {

    if (getTokenFromRequestHeader(req)) {
        next();
    } else {
        return httpResponse(res, 401, 'Unauthorized user', null);

    }
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        const decoded = jwt.verify(getTokenFromRequestHeader(req), process.env.SECRET);
        next();
    } catch (error) {
        return httpResponse(res, 401, 'Invalid Token', null);
    }
}