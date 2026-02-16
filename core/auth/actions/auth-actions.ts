import { spotifyApi } from "@/core/api/spotify-api";

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

        return data;
    } catch (error) {
        console.log(error);

        return "INVALIDO";
    }
};