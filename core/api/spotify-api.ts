import axios from 'axios';


const spotifyApi = axios.create({
    baseURL: 'http://10.0.2.2:8082',
   // baseURL: 'http://192.168.0.24:8082',
});



export { spotifyApi };