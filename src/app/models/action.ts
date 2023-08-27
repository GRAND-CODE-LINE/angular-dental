import { Patient } from "./patient";
import { Symbol } from "./symbol";

export interface Action {
    id?: string,
    name: string,
    comments: string,
    price: number,
    item:number
}
