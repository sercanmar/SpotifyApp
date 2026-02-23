import { spotifyApi } from "@/core/api/spotify-api";
import { Playlist, Album, Cancion, Podcast, Artista } from "../interface/spotify-model";

export const getPlaylistSeguidas = async (userId: string): Promise<Playlist[]> => {
  const { data } = await spotifyApi.get<Playlist[]>(`/usuarios/${userId}/playlists-seguidas`);
  return data;
};

export const getAlbumesSeguidos = async (userId: string): Promise<Album[]> => {
  const { data } = await spotifyApi.get<Album[]>(`/usuarios/${userId}/albums-seguidos`);
  return data;
};

export const getCancionesSeguidas = async (userId: string): Promise<Cancion[]> => {
  const { data } = await spotifyApi.get<any[]>(`/usuarios/${userId}/canciones-guardadas`);
  

  const canciones = data.map(item => item.cancion ? item.cancion : item);
  
  return canciones;
};

export const getPodcastsSeguidos = async (userId: string): Promise<Podcast[]> => {
  const { data } = await spotifyApi.get<Podcast[]>(`/usuarios/${userId}/podcasts-seguidos`);
  return data;
};

export const getArtistasSeguidos = async (userId: string): Promise<Artista[]> => {
  const { data } = await spotifyApi.get<Artista[]>(`/usuarios/${userId}/artistas-seguidos`);
  return data;
};

export const getCancionesPlaylist = async (id: string): Promise<Cancion[]> => {
  const { data } = await spotifyApi.get<any[]>(`/playlists/${id}/canciones`);
  const canciones=data.map(item=>item.cancion)
  
  return canciones;
};

export const getPlaylists = async (): Promise<Playlist[]> => {
  const { data } = await spotifyApi.get<Playlist[]>('/playlists');
  return data;
};

export const getArtistas = async (): Promise<Artista[]> => {
  const { data } = await spotifyApi.get<Artista[]>('/artistas');
  return data;
};

export const getPodcasts = async (): Promise<Podcast[]> => {
  const { data } = await spotifyApi.get<Podcast[]>('/podcasts');
  return data;
};

export const getAlbumes = async (): Promise<Album[]> => {
  const { data } = await spotifyApi.get<Album[]>('/albums');
  return data;
};