import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080/api/books";
const GENRE_API_BASE_URL = "http://localhost:8080/api/genres";

export const listBook = () =>  axios.get(REST_API_BASE_URL);
export const createBook = (book) => axios.post(REST_API_BASE_URL, book);
export const getBook = (bookId) => axios.get(REST_API_BASE_URL + '/' + bookId);
export const updateBook = (bookId, book) => axios.put(REST_API_BASE_URL + '/' + bookId, book)
export const deleteBook = (bookId) => axios.delete(REST_API_BASE_URL + '/' + bookId);
export const getAllGenre = () => axios.get(GENRE_API_BASE_URL)
