import { Patient } from "./patient";

export interface Consultation {
    id?: string,
    date: Date,
    code: string,
    price: number,
    status: string,
    balance: number,
    description: string,
    patient: Patient

}
