import { Role } from "./role";

export interface Menu {
    id?: string,
    name: string,
    description: string,
    url: string,
    childs: Menu[],
    icon: string,
    //empty in collection menus, only used in roles
    permissions?: string[]
}