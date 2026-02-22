import { spotifyApi } from "@/core/api/spotify-api";
import { Playlist, Album, Cancion, Podcast, Artista } from "../interface/spotify-model";

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

export const getPodcastsSeguidos = async (): Promise<Podcast[]> => {
  const { data } = await spotifyApi.get<Podcast[]>('/usuarios/50/podcasts-seguidos');
  return data;
};

export const getArtistasSeguidos = async (): Promise<Artista[]> => {
  const { data } = await spotifyApi.get<Artista[]>('/usuarios/50/artistas-seguidos');
  return data;
};

export const getCancionesPlaylist = async (id: string): Promise<Cancion[]> => {
  const { data } = await spotifyApi.get<Cancion[]>(`/playlists/${id}/canciones`);
  return data;
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