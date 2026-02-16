import axios from 'axios';

//TODO: conectar mediante envs vars, Android e iOS

const spotifyApi = axios.create({
    baseURL: 'localhost:8082',
});

// TODO: interceptores (token)

export { spotifyApi };