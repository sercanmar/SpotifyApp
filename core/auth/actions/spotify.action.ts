import { spotifyApi } from "@/core/api/spotify-api";
import { Playlist, Album, Cancion, Podcast, Artista, Capitulo } from "../interface/spotify-model";

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
  const canciones = data.map(item => item.cancion)

  return canciones;
};

export const getPlaylists = async (): Promise<Playlist[]> => {
  const { data } = await spotifyApi.get<any>('/playlists');
  return typeof data === 'string' ? JSON.parse(data) : data;
};

export const getArtistas = async (): Promise<Artista[]> => {
  const { data } = await spotifyApi.get<any>('/artistas');
  return typeof data === 'string' ? JSON.parse(data) : data;
};

export const getPodcasts = async (): Promise<Podcast[]> => {
  const { data } = await spotifyApi.get<any>('/podcasts');
  return typeof data === 'string' ? JSON.parse(data) : data;
};
export const getCapitulosPodcast = async (id: string): Promise<Capitulo[]> => {
  const { data } = await spotifyApi.get<any>(`/podcasts/${id}/capitulos`);
  return typeof data === 'string' ? JSON.parse(data) : data;
};


export const getAlbumes = async (): Promise<Album[]> => {
  const { data } = await spotifyApi.get<any>('/albums');
  return typeof data === 'string' ? JSON.parse(data) : data;
};
export const getCanciones = async (): Promise<Cancion[]> => {
  const { data } = await spotifyApi.get<any>('/canciones');
  return typeof data === 'string' ? JSON.parse(data) : data;
};

export const getCancionesAlbum = async (id: string): Promise<Cancion[]> => {
  const { data } = await spotifyApi.get<any>(`/albums/${id}/canciones`);
  return typeof data === 'string' ? JSON.parse(data) : data;
};

export const getArtistaAlbum = async (id: string): Promise<Album[]> => {
  const { data } = await spotifyApi.get<any>(`/artistas/${id}/albums`);

  return typeof data === 'string' ? JSON.parse(data) : data;
};
export const getCapitulo = async (id: string): Promise<any> => {
  const { data } = await spotifyApi.get<any>(`/capitulos/${id}`);
  
  const datosParseados = typeof data === 'string' ? JSON.parse(data) : data;
  
  return Array.isArray(datosParseados) ? datosParseados[0] : datosParseados;
};
