import { patientWithId } from "./patient"
import { User } from "./user"

export type rootState = {
    login: {
        user: User
    },
    patient: {
        patientList: patientWithId[],
        total: number,
        isDeletePopupOpen: boolean | string | null
    }
}