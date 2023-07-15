import { Person } from "./Person";
import { Filter_I } from "./utils/filter_i";

export interface UserFilter extends Filter_I {
    id?: string,
    username?: string

}

export interface User {
    id?: string,
    username: string,
    password?: string,
    email: string,
    person: Person[]
}
