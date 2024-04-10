import React, { useState } from 'react';
import axios from 'axios';
import './FareCalculator.css'; 
import Layout from '../Layout/Layout';
import fareimage from '../Assets/fare-calculator.jpg'

// Import CSS file

const FareCalculator = () => {
    const [weight, setWeight] = useState('');
    const [distance, setDistance] = useState('');
    const [length, setLength] = useState('');
    const [breadth, setBreadth] = useState('');
    const [height, setHeight] = useState('');
    const [fare, setFare] = useState('');
    const [error, setError] = useState('');

    const calculateFare = async () => {
        try {
            const response = await axios.get(`https://localhost:44337/api/Fare/calculate?weight=${weight}&distance=${distance}&length=${length}&breadth=${breadth}&height=${height}`);
            setFare(response.data.toFixed(2)); // Limit to 2 decimal places
            setError('');
        } catch (error) {
            setError('Failed to calculate fare. Please try again.');
        }
    };

    return (
        <Layout title="Farecalculator Page">
        <div className="containers">
            <div className="image-containers">
                <img src={fareimage} alt="background" />
            </div>
            <div className="fare-calculator-content">
                <h2>Fare Calculation</h2>
                <div className="input-container">
                    <label htmlFor="weight">Weight (kg):</label>
                    <input type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
                <div className="input-container">
                    <label htmlFor="distance">Distance (km):</label>
                    <input type="number" id="distance" value={distance} onChange={(e) => setDistance(e.target.value)} />
                </div>
                <div className="input-container">
                    <label htmlFor="length">Length (m):</label>
                    <input type="number" id="length" value={length} onChange={(e) => setLength(e.target.value)} />
                </div>
                <div className="input-container">
                    <label htmlFor="breadth">Breadth (m):</label>
                    <input type="number" id="breadth" value={breadth} onChange={(e) => setBreadth(e.target.value)} />
                </div>
                <div className="input-container">
                    <label htmlFor="height">Height (m):</label>
                    <input type="number" id="height" value={height} onChange={(e) => setHeight(e.target.value)} />
                </div>
                <div className="button-container">
                    <button onClick={calculateFare}>Calculate Fare</button>
                </div>
                <div className="result-container">
                    {fare && (
                        <h3>
                            Total Fare: NPRs {fare}
                        </h3>
                    )}
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default FareCalculator;
