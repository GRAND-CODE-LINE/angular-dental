import { Filter_I } from "./utils/filter_i";

export interface Person{
    nombre: string;
	apaterno : string;
    amaterno:String;
	email: string;
	tipoDocumento: string;
	numeroDocumento : string;
	fechaNacimiento ?: Date;
}

export interface PersonFilter extends Filter_I {
    id?: string,
    name?: string
    
}