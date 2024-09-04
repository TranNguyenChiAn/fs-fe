import axios from "axios";
const GENRE_API_BASE_URL = "http://localhost:8080/api/genres";

export const listGenre = () =>  axios.get(GENRE_API_BASE_URL);
export const createGenre = (genre) => axios.post(GENRE_API_BASE_URL, genre);
export const getGenre = (genreId) => axios.get(GENRE_API_BASE_URL + '/' + genreId);
export const updateGenre = (genreId, genre) => axios.put(GENRE_API_BASE_URL + '/' + genreId, genre)
export const deleteGenre = (genreId) => axios.delete(GENRE_API_BASE_URL + '/' + genreId);
