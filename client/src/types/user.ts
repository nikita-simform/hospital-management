export type loginRequestBody = {
    email: string,
    password: string
}

export type signUpRequestBody = loginRequestBody & {
    firstName: string,
    lastName: string
}

export type APIResponse<T> = {
    data: T
}

export type User={
    id: string,
    name: string,
    email: string
}
type loginResponse = {
    data: {
        token: string,
        user: User
    },
    message: string
}

export type loginAPIResponse = APIResponse<loginResponse>

export type signupFormValues=signUpRequestBody & {
    confirm_password:string
}