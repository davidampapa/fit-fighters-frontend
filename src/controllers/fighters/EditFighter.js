import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditFighter() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [fighter, setFighter] = useState({
    firstName: "",
    lastName: "",
    weightDivision: "",
    age: "",
    winCount: "",
    loseCount: "",
    drawCount: "",
  });

  const {
    firstName,
    lastName,
    weightDivision,
    age,
    winCount,
    loseCount,
    drawCount,
  } = fighter;

  const onInputChange = (e) => {
    setFighter({ ...fighter, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadFighter();
  }, []);

  const onSubmit = async (e) => {
    try {
        e.preventDefault();
        await axios.put(`http://localhost:8080/fighters/${id}`, fighter);
        navigate("/");
      } catch (error) {
        console.error(error);
        alert("Wrong input")
      }
  };

  const loadFighter = async () => {
    const result = await axios.get(`http://localhost:8080/fighters/${id}`);
    setFighter(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Fighter</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                name="firstName"
                value={firstName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter last name"
                name="lastName"
                value={lastName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="weightDivision" className="form-label">
                Weight Division
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter weight division"
                name="weightDivision"
                value={weightDivision}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter age"
                name="age"
                value={age}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="winCount" className="form-label">
                Win Count
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter win count"
                name="winCount"
                value={winCount}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="drawCount" className="form-label">
                Draw Count
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter draw count"
                name="drawCount"
                value={drawCount}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="loseCount" className="form-label">
                Lose Count
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter lose count"
                name="loseCount"
                value={loseCount}
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
