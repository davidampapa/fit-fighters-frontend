import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ViewPlace = () => {
    const { id } = useParams();
    const [place, setPlace] = useState({
        name: "",
        address: "",
        city: "",
        country: "",
        capacity: "",
        description: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadPlace = async () => {
            try {
                const result = await axios.get(`http://localhost:8080/places/${id}`);
                setPlace(result.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch place');
                setLoading(false);
            }
        };
        loadPlace();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">View Place</h2>
                    <div className="mb-3">
                        <label className="form-label"><strong>Name:</strong></label>
                        <div>{place.name}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><strong>Address:</strong></label>
                        <div>{place.address}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><strong>Capacity:</strong></label>
                        <div>{place.capacity}</div>
                    </div>
                    <Link className="btn btn-outline-primary mx-2" to="/">
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ViewPlace;
