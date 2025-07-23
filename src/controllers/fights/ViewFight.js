import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ViewFight = () => {
    const { id } = useParams();
    const [fight, setFight] = useState({
        date: '',
        time: '',
        martial_art: '',
        result: '',
    });
    const [fighter1, setFighter1] = useState(null);
    const [fighter2, setFighter2] = useState(null);
    const [winner, setWinner] = useState(null);
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadFight = async () => {
            try {
                const fightRes = await axios.get(`http://localhost:8080/fights/${id}`);
                const fightData = fightRes.data;

                setFight({
                    date: fightData.date,
                    time: fightData.time,
                    martial_art: fightData.martial_art,
                    result: fightData.result,
                });

                // GET fighters from _embedded.fighters
                const fightersRes = await axios.get(fightData._links.fighters.href);
                const fighters = fightersRes.data._embedded?.fighters || [];

                if (fighters.length < 2) {
                    throw new Error('Not enough fighters found for this fight');
                }

                setFighter1(fighters[0]);
                setFighter2(fighters[1]);

                // Place
                const placeRes = await axios.get(fightData._links.place.href);
                setPlace(placeRes.data);

                // Winner
                const winnerRes = await axios.get(fightData._links.winner.href);
                setWinner(winnerRes.data);
                
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch fight details');
                setLoading(false);
            }
        };

        loadFight();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">View Fight</h2>
                    <div className="mb-3">
                        <label className="form-label"><strong>Date:</strong></label>
                        <div>{fight.date}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><strong>Fighter 1:</strong></label>
                        <div>{fighter1 ? `${fighter1.firstName} ${fighter1.lastName}` : 'N/A'}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><strong>Fighter 2:</strong></label>
                        <div>{fighter2 ? `${fighter2.firstName} ${fighter2.lastName}` : 'N/A'}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><strong>Place:</strong></label>
                        <div>{place ? place.name : 'N/A'}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><strong>Result:</strong></label>
                        <div>{winner ? `${winner.firstName} ${winner.lastName}` : 'N/A'}</div>
                    </div>
                    <Link className="btn btn-outline-primary mx-2" to="/">
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ViewFight;
