import axios from 'axios';


const spotifyApi = axios.create({
    baseURL: 'http://10.0.2.2:8082',
});



export { spotifyApi };