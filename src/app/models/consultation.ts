import { Action } from "./action";
import { Attention } from "./attention";
import { Patient } from "./patient";
import { Payment } from "./payment";

export interface Consultation {
    id?: string,
    date: Date,
    code: string,
    price: number,
    status: string,
    balance: number,
    description: string,
    patient: Patient,
    attentions: Attention[]
    actions: Action[],
    payments: Payment[]
}
