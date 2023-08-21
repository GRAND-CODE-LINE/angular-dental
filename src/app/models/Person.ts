import { Filter_I } from "./utils/filter_i";

export interface Person {
	id?: string;
	nombre: string;
	apaterno: string;
	amaterno: string;
	email: string;
	tipoDocumento: string;
	numeroDocumento: string;
	fechaNacimiento?: Date;
	direccion: string;
	genero:string;
	celular:string;
}

export interface PersonFilter extends Filter_I {
	id?: string,
	name?: string
}