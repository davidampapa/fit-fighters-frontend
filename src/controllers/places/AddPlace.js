import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddPlace() {
    let navigate = useNavigate();

    const [place, setPlace] = useState({
        name: "",
        address: "",
        capacity: 0,
    });

    const { name, address, capacity } = place;

    const onInputChange = (e) => {
        setPlace({ ...place, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            await axios.post(`http://localhost:8080/places`, place);
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
                    <h2 className="text-center m-4">Add Place</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter place name"
                                name="name"
                                value={name}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter address"
                                name="address"
                                value={address}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="capacity" className="form-label">
                                Capacity
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter capacity"
                                name="capacity"
                                value={capacity}
                                onChange={onInputChange}
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