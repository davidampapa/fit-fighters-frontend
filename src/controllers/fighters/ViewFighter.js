import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ViewFighter = () => {
    const { id } = useParams();
    const [fighter, setFighter] = useState({
        name: "",
        nickname: "",
        age: "",
        weightClass: "",
        country: "",
        record: "",
        description: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadFighter = async () => {
            try {
                const result = await axios.get(`http://localhost:8080/fighters/${id}`);
                setFighter(result.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch fighter');
                setLoading(false);
            }
        };
        loadFighter();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">View Fighter</h2>
                    <div className="mb-3">
                        <label className="form-label"><strong>First Name:</strong></label>
                        <div>{fighter.firstName}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><strong>Last Name:</strong></label>
                        <div>{fighter.lastName}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><strong>Weight Class:</strong></label>
                        <div>{fighter.weightDivision}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><strong>Age:</strong></label>
                        <div>{fighter.age}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><strong>Wins:</strong></label>
                        <div>{fighter.winCount}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><strong>Loses:</strong></label>
                        <div>{fighter.loseCount}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><strong>Draws:</strong></label>
                        <div>{fighter.drawCount}</div>
                    </div>
                    <Link className="btn btn-outline-primary mx-2" to="/">
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ViewFighter;