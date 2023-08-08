import { Person } from "./Person";
import { Filter_I } from "./utils/filter_i";

export interface Patient {
	id?: string;
	alergias: string;
	redsocial: string;
	fotoPermiso: String;
	numeroEmergencia: string;
	contactoEmergencia: string;
	Enfermedades: string;
	peso: DoubleRange;
    talla:DoubleRange;
    Persona:Person;
}

export interface PatientFilter extends Filter_I {
	id?: string,
	name?: string
}