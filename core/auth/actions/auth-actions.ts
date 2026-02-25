import { spotifyApi } from "@/core/api/spotify-api";
import { User } from "@/core/auth/interface/user";


export interface AuthResponse {
    id:              string;
    username:        string;
    email:           string;
    genero:          string;
    fechaNacimiento: Date;
    pais:            string;
    codigoPostal:    string;
}

export const authLogin = async (email: string, password: string) => {
    email = email.toLowerCase().trim();

    try {
        const { data } = await spotifyApi.post<AuthResponse>('/login', { email, password });
        
        return { user: data, token: data.email };
    } catch (error) {
        return null;
    }
};


export const authCheckStatus = async () => {
    try {
        const { data } = await spotifyApi.get<AuthResponse>('/auth/check-status');
        return { user: data, token: data.email };
    } catch (error) {
        console.log(error);
        return null;
    }
};
export const getPerfil = async (id: string) => {
    const { data } = await spotifyApi.get(`/usuarios/${id}`);
    return typeof data === 'string' ? JSON.parse(data) : data;
};

export const putPerfil = async (id: string, username: string, email: string) => {
    try {
        const { data } = await spotifyApi.put(`/usuarios/${id}`, { username, email });
        return { ok: true, user: data };
    } catch (error) {
        return { ok: false };
    }
};

export const getConfiguracion = async (id: string) => {
    const { data } = await spotifyApi.get(`/usuarios/${id}/configuracion`);
    return typeof data === 'string' ? JSON.parse(data) : data;
};

export const putConfig = async (id: string, configuracion: any) => {
    try {
        const { data } = await spotifyApi.put(`/usuarios/${id}/configuracion`, configuracion);
        return { ok: true, user: data };
    } catch (error) {
        return { ok: false };
    }
};
export const getSuscripciones = async (id: string) => {
    try {
        const { data } = await spotifyApi.get(`/suscripciones/${id}`);
        return typeof data === 'string' ? JSON.parse(data) : data;
    } catch (error) {
        return null;
    }
};


export const authRegister = async (email: string, password: string, username: string, fechaNacimiento: string) => {
    try {
       
        const { data } = await spotifyApi.post<AuthResponse>('/usuarios', { 
            username, 
            password, 
            email, 
            fechaNacimiento 
        });

        return {
            user: data,
            token: data.email 
        };

    } catch (error) {
        console.log(error);
        return null;
    }
};