const { default: axios } = require("axios");

const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGZhMjE1NTcyZjJjMzA4ZjBlNWViMjZlOGVjYjI3NyIsIm5iZiI6MTc3NzI2ODkxNS44NjksInN1YiI6IjY5ZWVmOGIzZTkxN2YwZWRlNGI0ZjU4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fVGSwkmGDxW8Kl6Uubug_I3ppQ3wHd2xL5JzhwGjQlw";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
    }
})

export default api;