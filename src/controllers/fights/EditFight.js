import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditFight() {
    let navigate = useNavigate();
    const { id } = useParams();

    let [fight, setFight] = useState({
        fighters: "",
        martialArt: "",
        date: "",
        time: "",
        winner: ""
    });

    let {
        fighters,
        martialArt,
        date,
        time,
        winner,
    } = fight;

    const onInputChange = (e) => {
        setFight({ ...fight, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadFight();
    }, []);

    const onSubmit = async (e) => {
        try {
                e.preventDefault();
                console.log(fight)
                await axios.put(`http://localhost:8080/fights/${id}`, fight);
                navigate("/");
            } catch (error) {
                console.error(error);
                alert("Wrong input")
            }
    };

    const loadFight = async () => {
        const result = await axios.get(`http://localhost:8080/fights/${id}`);
        const fightersName = await getWinnersName(`http://localhost:8080/fights/${id}/winner`);
        setFight({...result.data, winner: fightersName});
    };


    const getWinnersName = async (urlWithId) => {
        try {
            const result = await axios.get(urlWithId);
            const retur = await axios.get(result.data._links.fighter.href);
            return retur.data.firstName + " " + retur.data.lastName;
          } catch (error) {
            console.error(error); 
          }
      } 

    const getFightersName = async (urlWithId) => {
        try {
            const result = await axios.get(urlWithId);
            const ret = result.data._embedded.fighters[0].lastName + " vs " + result.data._embedded.fighters[1].lastName;
            return ret
          } catch (error) {
            console.error(error);
          }
      }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit Fight</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="fighters" className="form-label">
                                Fighters
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter fighters"
                                name="fighters"
                                value={fighters}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="martialArt" className="form-label">
                                Martial Art
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter martial art"
                                name="martialArt"
                                value={martialArt}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">
                                Date
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter date"
                                name="date"
                                value={date}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="time" className="form-label">
                                Time
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter time"
                                name="time"
                                value={time}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="winner" className="form-label">
                                Result
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter result"
                                name="winner"
                                value={winner}
                                onChange={(e) => onInputChange(e)}
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