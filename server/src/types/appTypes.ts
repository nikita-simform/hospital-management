import { Request } from "express"

export type PaginationConfig = {
    page: number,
    limit: number
}

type SortingType = 'asc' | 'desc' | 'ASC' | 'DESC'

export type SortConfig = {
    sort: string,
    direction: SortingType
}

export type PatientType = {
    firstName: string,
    middleName: string,
    lastName: string,
    age: number,
    address: string,
    contact_number: string,
    email: string,
    id?:string
}

export type UserType={
    firstName:string,
    lastName:string,
    email:string,
    password:string
}