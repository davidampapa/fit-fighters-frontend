import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [fighters, setFighters] = useState([]);

  useEffect(() => {
    loadFighters();
  }, []);

  const loadFighters = async () => {
    try {
      const result = await axios.get('http://localhost:8080/fighters');
      console.log(result);
      setFighters(result.data._embedded.fighters);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFighter = async (urlWithId) => {
    console.log(urlWithId)
    try {
      const result = await axios.delete(urlWithId);
      loadFighters();
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
              <th scope='col'>First Name</th>
              <th scope='col'>Last Name</th>
              <th scope='col'>Weight Division</th>
              <th scope='col'>Age</th>
              <th scope='col'>Win count</th>
              <th scope='col'>Draw count</th>
              <th scope='col'>Lose count</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fighters.map((fighter, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{fighter.firstName}</td>
                <td>{fighter.lastName}</td>
                <td>{fighter.weightDivision}</td>
                <td>{fighter.age}</td>
                <td>{fighter.winCount}</td>
                <td>{fighter.drawCount}</td>
                <td>{fighter.loseCount}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editfighter/${fighter._links.self.href.split('/').slice(-1)[0]}`}
                  >
                    Edit
                  </Link>
                  <button
                    className='btn btn-danger mx-2'
                    onClick={() => deleteFighter(fighter._links.self.href)}
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
