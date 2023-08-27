import { Consultation } from "./consultation";
import { Procedure } from "./procedure";


export interface Attention {
    id?: string,
    endDate: Date,
    status: string,
    comments: string,
    consultation: Consultation,
    procedures: Procedure[]
}
