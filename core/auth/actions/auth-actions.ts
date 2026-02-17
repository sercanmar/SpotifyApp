import { spotifyApi } from "@/core/api/spotify-api";
import { User } from "@/core/auth/interface/user";

export interface AuthResponse {
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