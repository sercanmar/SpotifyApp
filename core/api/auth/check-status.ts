import { AuthResponse } from "../../auth/actions/auth-actions";
import { spotifyApi } from "../spotify-api";

export const authCheckStatus = async (token: string) => {
    try {
        const { data } = await spotifyApi.get<AuthResponse>('/auth/check-status');

        return { user: data, token: data.email };
    } catch (error) {
        console.log(error);
        return null;
    }
};