import { spotifyApi } from "@/core/api/spotify-api";
import { Playlist,Album,Cancion } from "../interface/spotify-model";


export const getPlaylistSeguidas = async (): Promise<Playlist[]> => {
  const { data } = await spotifyApi.get<Playlist[]>('/usuarios/50/playlists-seguidas');
  return data;
};

export const getAlbumesSeguidos= async (): Promise<Album[]> => {
  const { data } = await spotifyApi.get<Album[]>('/usuarios/10/albums-seguidos');
  return data;
};

export const getCancionesSeguidas= async (): Promise<Cancion[]> => {
  const { data } = await spotifyApi.get<Cancion[]>('/usuarios/10/canciones-guardadas');
  return data;
};