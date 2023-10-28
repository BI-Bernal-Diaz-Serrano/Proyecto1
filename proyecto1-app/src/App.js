import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const [frase, setFrase] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [history, setHistory] = useState([]);
    const [filter, setFilter] = useState('all');

    const handlePredict = async () => {
        try {
            const response = await axios.post('http://localhost:5000/predict', { text: frase});
            const predictedValue = response.data.prediction;

            setPrediction(predictedValue);
            setHistory([...history, { frase, prediction: predictedValue }]);
        } catch (error) {
            console.error("Error al obtener la predicción:", error);
        }
    }

    const filteredHistory = filter === 'all' ? history : history.filter(record => record.prediction.toString() === filter);

    return (
        <div className="container mt-5">
           <div className="navbar">
                <h2>Grupo 15 Inteligencia de Negocios</h2>
            </div>
            <div className="mb-3">
                <input 
                    className="form-control"
                    type="text" 
                    value={frase}
                    onChange={(e) => setFrase(e.target.value)} 
                    placeholder="Escribe una frase sobre algun objetivo de desarrollo sostenible"
                />
            </div>
            <button className="btn btn-primary mb-3" onClick={handlePredict}>Clasificar</button>
            {prediction !== null && <p className="mb-4">Clasificacion: {prediction}</p>}

            <h2 className="text-center mb-4">Historial de Clasificaciones</h2>
            
            <label htmlFor="predictionFilter" className="me-2">Filtrar por Clasificaciones ODS:</label>
            <select 
                id="predictionFilter"
                className="form-select mb-4" 
                value={filter} 
                onChange={e => setFilter(e.target.value)}
            >
                <option value="all">Todas</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Frase</th>
                        <th>Clasificacion </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredHistory.map((record, index) => (
                        <tr key={index} className="row-background">
                            <td>{record.frase}</td>
                            <td>{record.prediction}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
