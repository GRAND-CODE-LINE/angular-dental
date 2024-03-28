import { Symbol } from "./symbol";

export interface Procedure {
    id?: string,
    name: string,
    status: string,
    comments?: string,
    symbol: Symbol,
    item?: number
}
