import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddFight() {
    const navigate = useNavigate();

    const [fight, setFight] = useState({
        placeId: "",
        fighter1Id: "",
        fighter2Id: "",
        date: "",
    });

    const [places, setPlaces] = useState([]);
    const [fighters, setFighters] = useState([]);

    useEffect(() => {
        // Fetch places
        axios.get("http://localhost:8080/places")
            .then(res => setPlaces(res.data._embedded?.places || []))
            .catch(err => console.error(err));
        
        // Fetch fighters
        axios.get("http://localhost:8080/fighters")
            .then(res => setFighters(res.data._embedded?.fighters || []))
            .catch(err => console.error(err));
    }, []);

    const onInputChange = (e) => {
        setFight({ ...fight, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/fights", fight);
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Wrong input");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Add Fight</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="placeId" className="form-label">Place</label>
                            <select
                                className="form-control"
                                name="placeId"
                                value={fight.placeId}
                                onChange={onInputChange}
                                required
                            >
                                <option value="">Select place</option>
                                {places.map(place => (
                                    <option key={place.id} value={place.id}>
                                        {place.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fighter1Id" className="form-label">Fighter 1</label>
                            <select
                                className="form-control"
                                name="fighter1Id"
                                value={fight.fighter1Id}
                                onChange={onInputChange}
                                required
                            >
                                <option value="">Select fighter 1</option>
                                {fighters.map(fighter => (
                                    <option key={fighter.id} value={fighter.id}>
                                        {fighter.lastname} {fighter.firstname}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fighter2Id" className="form-label">Fighter 2</label>
                            <select
                                className="form-control"
                                name="fighter2Id"
                                value={fight.fighter2Id}
                                onChange={onInputChange}
                                required
                            >
                                <option value="">Select fighter 2</option>
                                {fighters.map(fighter => (
                                    <option key={fighter.id} value={fighter.id}>
                                        {fighter.lastname} {fighter.firstname}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                value={fight.date}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}