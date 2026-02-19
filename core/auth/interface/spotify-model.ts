import { User } from './user';

export interface Playlist {
  id: number;
  titulo: string;
  numeroCanciones: number;
  fechaCreacion: Date;
  usuario: User;
}

export interface Album {
  id: number;
  titulo: string;
  imagen: string;
  patrocinado: string;
  fechaInicioPatrocinio: Date;
  fechaFinPatrocinio: Date;
  anyo: Date;
}

export interface Cancion {
  id: number;
  titulo: string;
  duracion: number;
  ruta: string;
  numeroReproducciones: number;
}