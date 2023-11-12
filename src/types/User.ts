import {Role} from "./Role";
import {Catalog} from "./Catalog";

export type User = {
    id: number;
    nombre: string;
    apellido: string;
    dni: number;
    email: string;
    password: string;
    blocked: boolean;
    role: Role;
    codigo: string;
    escuela: string;
    conferencias: Conferencia[];
};
export type Conferencia = {
    id: string;
    tema_conferencia: string;
    expositor: string;
    descripcion: string;
};