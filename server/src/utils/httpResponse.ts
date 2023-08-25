import { Response } from "express";

export const httpResponse = (res:Response, statusCode:number, message:string | {error:string}, data:object | null) => {

    return res.status(statusCode).json({
        data,
        message
    })
}

export const httpErrorResponse = (res:Response, error:any) => {
    if (error.code) {
        return httpResponse(res, error.code, error.message,null)
    }
    else {
        return httpResponse(res, 500, "Internal Server Error",null);
    }
}
