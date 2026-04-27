const { default: axios } = require("axios");

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`
    }
})

export default api;