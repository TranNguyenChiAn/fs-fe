import React, { useState, useEffect } from 'react';
import {deleteBook, listBook} from "../../services/BookService.jsx";
import { useNavigate } from 'react-router-dom';


const BookList = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getAllBook();
    }, []);

    function getAllBook(){
        listBook().then(response => {
            console.log(response.data);
            setBooks(response.data);
        })
            .catch(error => console.error(error));
    }
    function addNewBook() {
        navigate('/add-book');
    }
    function editBook(id){
        navigate(`/edit-book/${id}`);
    }
    function removeBook(id){
        deleteBook(id).then(response => {
            getAllBook();
        })
            .catch(error => console.error(error));
    }

    return (
        <div className='container'>
            <h1>Book List</h1>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Title</th>
                        <th> Author </th>
                        <th> Genre </th>
                        <th> Page number </th>
                        <th> Quantity </th>
                        <th> Price</th>
                        <th> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map(book => (
                        <tr key={book.id}>
                            <td>{book.id} </td>
                            <td>{book.title} </td>
                            <td>{book.author} </td>
                            <td>{book.genre_id.name} </td>
                            <td>{book.page_number} </td>
                            <td>{book.quantity} </td>
                            <td>{book.price} </td>
                            <td>
                              <button className='btn btn-warning mx-1' onClick={ () => editBook(book.id) }>
                                  Edit
                              </button>
                              <button className='btn btn-danger' onClick={ () => removeBook(book.id) }>
                                  Delete
                              </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='btn btn-primary mt-3' onClick={addNewBook}> Add book </button>
        </div>
    );
};
export default BookList;