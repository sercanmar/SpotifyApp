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
        if (!data.id) {
            data.id = "50"; 
        }
        
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

export const putPerfil = async (id: string, username: string, email: string) => {
    try {
        const { data } = await spotifyApi.put(`/usuarios/${id}`, { username, email });
        return { ok: true, user: data };
    } catch (error) {
        return { ok: false };
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