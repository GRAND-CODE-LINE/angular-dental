import { Filter_I } from "./utils/filter_i";

export interface SymbolFilter extends Filter_I {
    id?: string,
    name?: string,
    active?: boolean

}

export interface Symbol {
    id?: string,
    name: string,
    active?: boolean,
    image: string,
    acronym?: string,
    group: string
}
