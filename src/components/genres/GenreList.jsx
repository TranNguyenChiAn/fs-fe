import React, { useState, useEffect } from 'react';
import {deleteGenre, listGenre} from "../../services/GenreService.jsx";
import { useNavigate } from 'react-router-dom';


const GenreList = () => {
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
       getGenre();
    }, []);

    function getGenre(){
        listGenre().then(response => {
            console.log(response.data);
            setGenres(response.data);
        })
            .catch(error => console.error(error));
    }
    function addNewGenre() {
        navigate('/add-genre');
    }
    function editGenre(id){
        navigate(`/edit-genre/${id}`);
    }
    function removeGenre(id){
        deleteGenre(id).then(response => {
            getGenre();
        })
            .catch(error => console.error(error));
    }

    return (
        <div className='containe'>
            <h1>Genre List</h1>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Name </th>
                        <th> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        genres.map(genre => (
                        <tr key={genre.id}>
                            <td>{genre.id} </td>
                            <td>{genre.name} </td>
                            <td>
                              <button className='btn btn-warning mx-1' onClick={ () => editGenre(genre.id) }>
                                  Edit
                              </button>
                              <button className='btn btn-danger' onClick={ () => removeGenre(genre.id) }>
                                  Delete
                              </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='btn btn-primary mt-3' onClick={addNewGenre}> Add new genre</button>
        </div>
    );
};
export default GenreList;