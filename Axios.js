import axios from "axios";

// Set config defaults when creating the instance
const Axios = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/'
});

export default Axios;