import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ListFights() {
  const [fights, setFights] = useState([]);
  const [fightersNames, setFightersNames] = useState([]);

  useEffect(() => {
    loadFights();
  }, []);

  const loadFights = async () => {
    try {
      const result = await axios.get('http://localhost:8080/fights');
      console.log(result);
      setFights(result.data._embedded.fights);
      const fightersNamesPromises = result.data._embedded.fights.map(fight => getFightersName(fight._links.fighters.href));
      const fightersNames = await Promise.all(fightersNamesPromises);
      setFightersNames(fightersNames);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFighter = async (urlWithId) => {
    console.log(urlWithId)
    try {
      const result = await axios.delete(urlWithId);
      loadFights();
    } catch (error) {
      console.error(error);
    }
  };

  const getFightersName = async (urlWithId) => {
    try {
        const result = await axios.get(urlWithId);
        console.log(result)
        const ret = result.data._embedded.fighters[0].lastName + " vs " + result.data._embedded.fighters[1].lastName
        return ret
      } catch (error) {
        console.error(error);
      }
  }

  return (
    <div className='container'>
      <div className='pt-4'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Date</th>
              <th scope='col'>Time</th>
              <th scope='col'>Martial Art</th>
              <th scope='col'>Fighters</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fights.map((fight, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{fight.date}</td>
                <td>{fight.time}</td>
                <td>{fight.martial_art}</td>
                <td>{fightersNames[index]}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/viewfight/${fight._links.self.href.split('/').slice(-1)[0]}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editfight/${fight._links.self.href.split('/').slice(-1)[0]}`}
                  >
                    Edit
                  </Link>
                  <button
                    className='btn btn-danger mx-2'
                    onClick={() => deleteFighter(fight._links.self.href)}
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