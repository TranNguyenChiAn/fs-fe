import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {createGenre, getGenre, updateGenre} from "../../services/GenreService.jsx";

const GenreComponent = () => {
    const [name, setName] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    const [errors, setErrors] = useState({
        name: '',
    });

    useEffect(() => {
        if(id) {
            getGenre(id).then((response) => {
                const genre = response.data;
                setName(genre.name);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id]);

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors }

        if(name.trim()) {
            errorsCopy.name = '';
        } else {
            errorsCopy.name = 'Name is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function saveGenre(e) {
        e.preventDefault();

        if (validateForm()) {
            const genre = { name };
            console.log(genre);

            if (id) {
                updateGenre(id, genre).then((response) => {
                    console.log(response.data);
                    navigate('/genres');
                })
            } else {
                createGenre(genre).then((response) => {
                    console.log(response.data);
                    navigate('/genres');
                })
            }
        }
    }

    return (
        <div className='container'>
            <div className='card'>
                <div className='card-body'>
                    <form className='row'>
                        {id ? <h2 className='text-center'>Update Genre</h2> : <h2 className='text-center'>Create Genre</h2>}

                        {/* Name */}
                        <div className='form-group mb-2 col-6'>
                            <label>Name:</label>
                            <input type="text" value={name} name="name"
                                   className={`form-control m-3 ${errors.name ? 'is-invalid' : ''}`}
                                   onChange={(e) => setName(e.target.value)} />
                            {errors.name && <div className='invalid-feedback'> {errors.name} </div>}
                        </div>

                        <button type="submit" className='btn btn-success' onClick={saveGenre}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GenreComponent;
