import { Menu } from "./menu";
import { Filter_I } from "./utils/filter_i";

export interface RoleFilter extends Filter_I {
    id?: string,
    name?: string

}



export interface Role {
    id?: string,
    name: string,
    description: string,
    role_menu: Menu[]
}


