import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ListPlaces() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        loadPlaces();
    }, []);

    const loadPlaces = async () => {
        try {
            const result = await axios.get('http://localhost:8080/places');
            setPlaces(result.data._embedded.places);
        } catch (error) {
            console.error(error);
        }
    };

    const deletePlace = async (urlWithId) => {
        try {
            await axios.delete(urlWithId);
            loadPlaces();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='container'>
            <div className='pt-4'>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Address</th>
                            <th scope='col'>Capacity</th>
                            <th scope='col'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {places.map((place, index) => (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{place.name}</td>
                                <td>{place.address}</td>
                                <td>{place.capacity}</td>
                                <td>
                                    <Link
                                        className="btn btn-outline-primary mx-2"
                                        to={`/viewplace/${place._links.self.href.split('/').slice(-1)[0]}`}
                                    >
                                        View
                                    </Link>
                                    <Link
                                        className="btn btn-outline-primary mx-2"
                                        to={`/editplace/${place._links.self.href.split('/').slice(-1)[0]}`}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className='btn btn-danger mx-2'
                                        onClick={() => deletePlace(place._links.self.href)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}