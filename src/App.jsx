import {BrowserRouter, Route, Router, Routes} from 'react-router-dom' ;
import BookList from './components/books/BookList.jsx';
import CreateBook from "./components/books/CreateBook.jsx";
import './App.css'
import Layout from "./components/Layout.jsx";
import GenreComponent from "./components/genres/GenreComponent.jsx";
import GenreList from "./components/genres/GenreList.jsx";
import 'bootstrap-icons/font/bootstrap-icons.css';

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<BookList/>}></Route>
                    <Route path="/books" element={<BookList/>}></Route>
                    <Route path="/add-book" element={<CreateBook/>}></Route>
                    <Route path="/edit-book/:id" element={<CreateBook/>}></Route>

                    <Route path="/genres" element={<GenreList/>}></Route>
                    <Route path="/add-genre" element={<GenreComponent/>}></Route>
                    <Route path="/edit-genre/:id" element={<GenreComponent/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
