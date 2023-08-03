import { sortDirection } from "./appTypes"

export type Patient = {
    firstName: string,
    middleName: string,
    lastName: string,
    age: number,
    address: string,
    contact_number: string,
    email: string
}

export type updatePatient = Patient & {
    id?: string
}

export type patientWithId = Patient & {
    _id: string
}

type pagination={
    page?: number,
    limit?: number
}

type sorting={
    sort?: string,
    direction?:sortDirection
}

export type patientQueryParam= pagination & sorting