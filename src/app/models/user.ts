import { Person } from "./Person";

export interface User {
    id?: string,
    username: string,
    password?: string,
    person: Person[]
}
