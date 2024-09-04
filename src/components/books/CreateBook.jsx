import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { createBook, getAllGenre, getBook, updateBook } from "../../services/BookService.jsx";

const CreateBook = () => {
    const [genres, setGenres] = useState([]);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre_id, setGenre_id] = useState('');
    const [summary, setSummary] = useState('');
    const [page_number, setPage_number] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    const [errors, setErrors] = useState({
        title: '',
        author: '',
        summary: '',
        page_number: '',
        quantity: '',
        price: '',
    });

    useEffect(() => {
        getAllGenre().then(response => {
            setGenres(response.data);
        }).catch(error => {
            console.error("There was an error fetching the genres!", error);
        });

        if (id) {
            getBook(id).then((response) => {
                const book = response.data;
                setTitle(book.title);
                setAuthor(book.author);
                setGenre_id(book.genre_id.id);
                setSummary(book.summary);
                setPage_number(book.page_number);
                setQuantity(book.quantity);
                setPrice(book.price);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id]);

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors }

        if (title.trim()) {
            errorsCopy.title = '';
        } else {
            errorsCopy.title = 'Title is required';
            valid = false;
        }

        if (author.trim()) {
            errorsCopy.author = '';
        } else {
            errorsCopy.author = 'Author is required';
            valid = false;
        }

        if (summary.trim()) {
            errorsCopy.summary = '';
        } else {
            errorsCopy.summary = 'Summary is required';
            valid = false;
        }

        if (String(page_number).trim()) {
            errorsCopy.page_number = '';
        } else {
            errorsCopy.page_number = 'Page number is required';
            valid = false;
        }

        if (String(quantity).trim()) {
            errorsCopy.quantity = '';
        } else {
            errorsCopy.quantity = 'Quantity is required';
            valid = false;
        }

        if (String(price).trim()) {
            errorsCopy.price = '';
        } else {
            errorsCopy.price = 'Price is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function saveBook(e) {
        e.preventDefault();

        if (validateForm()) {
            const genre = genres.find(g => g.id === parseInt(genre_id));
            const book = { title, author, genre_id: genre, summary, page_number, quantity, price };
            console.log(book);

            if (id) {
                updateBook(id, book).then((response) => {
                    console.log(response.data);
                    navigate('/books');
                })
            } else {
                createBook(book).then((response) => {
                    console.log(response.data);
                    navigate('/books');
                })
            }
        }
    }

    return (
        <div className='container'>
            <div className='card'>
                <div className='card-body'>
                    <form className='row'>
                        {id ? <h2 className='text-center'>Update Book</h2> : <h2 className='text-center'>Create Book</h2>}

                        {/* Title */}
                        <div className='form-group mb-2 col-6'>
                            <label>Title:</label>
                            <input type="text" value={title} name="title"
                                   className={`form-control m-3 ${errors.title ? 'is-invalid' : ''}`}
                                   onChange={(e) => setTitle(e.target.value)} />
                            {errors.title && <div className='invalid-feedback'> {errors.title} </div>}
                        </div>

                        {/* Author */}
                        <div className='form-group mb-2 col-6'>
                            <label>Author:</label>
                            <input type="text" value={author} name="author"
                                   className={`form-control m-3 ${errors.author ? 'is-invalid' : ''}`}
                                   onChange={(e) => setAuthor(e.target.value)} />
                            {errors.author && <div className='invalid-feedback'>{errors.author}</div>}
                        </div>

                        {/* Summary */}
                        <div className='form-group mb-2 col-6'>
                            <label>Summary:</label>
                            <input type="text" value={summary} name="summary"
                                   className={`form-control m-3 ${errors.summary ? 'is-invalid' : ''}`}
                                   onChange={(e) => setSummary(e.target.value)} />
                            {errors.summary && <div className='invalid-feedback'>{errors.summary}</div>}
                        </div>

                        {/* Page Number */}
                        <div className='form-group mb-2 col-6'>
                            <label>Page number:</label>
                            <input type="number" value={page_number} name="page_number"
                                   className={`form-control m-3 ${errors.page_number ? 'is-invalid' : ''}`}
                                   onChange={(e) => setPage_number(e.target.value)} />
                            {errors.page_number && <div className='invalid-feedback'>{errors.page_number}</div>}
                        </div>

                        {/* Genre */}
                        <div className='form-group mb-2 col-6'>
                            <label>Genre:</label>
                            <select className='form-select dropdown' value={genre_id} name="genre_id"
                                    onChange={(e) => setGenre_id(e.target.value)}>
                                <option value="">-- Select genre --</option>
                                {genres.map(genre => (
                                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Quantity */}
                        <div className='form-group mb-2 col-6'>
                            <label>Quantity:</label>
                            <input type="number" value={quantity} name="quantity"
                                   className={`form-control m-3 ${errors.quantity ? 'is-invalid' : ''}`}
                                   onChange={(e) => setQuantity(e.target.value)} />
                            {errors.quantity && <div className='invalid-feedback'>{errors.quantity}</div>}
                        </div>

                        {/* Price */}
                        <div className='form-group mb-2 col-6'>
                            <label>Price:</label>
                            <input type="number" value={price} name="price"
                                   className={`form-control m-3 ${errors.price ? 'is-invalid' : ''}`}
                                   onChange={(e) => setPrice(e.target.value)} />
                            {errors.price && <div className='invalid-feedback'>{errors.price}</div>}
                        </div>

                        <button type="submit" className='btn btn-success' onClick={saveBook}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateBook;
