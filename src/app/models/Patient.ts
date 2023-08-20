import { Consultation } from "./consultation";
import { Person } from "./person";
import { Filter_I } from "./utils/filter_i";

export interface Patient {
	id?: string;
	alergias: string[];
	redSocial: string;
	fotoPermiso: string;
	numeroEmergencia: string;
	contactoEmergencia: string;
	enfermedades: string[];
	peso: number;
	talla: number;
	persona: Person;
	consultations?: Consultation[]
}

export interface PatientFilter extends Filter_I {
	id?: string;
	name?: string
}