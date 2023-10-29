import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import * as XLSX from 'xlsx';
import ods3Image from './ods3.jpg';
import ods4Image from './ods4.jpg';
import ods5Image from './ods5.jpg';
function App() {
    const [frase, setFrase] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [history, setHistory] = useState([]);
    const [filter, setFilter] = useState('all');
    const [uploadedData, setUploadedData] = useState([]);

    const handlePredict = async () => {
        try {
            const response = await axios.post('http://localhost:5000/predict', { text: frase });
            const predictedValue = response.data.prediction;

            setPrediction(predictedValue);
            setHistory([...history, { frase, prediction: predictedValue }]);
        } catch (error) {
            console.error("Error al obtener la predicción:", error);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = async (evt) => {
            const data = evt.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const wsname = workbook.SheetNames[0];
            const ws = workbook.Sheets[wsname];
            const items = XLSX.utils.sheet_to_json(ws, { header: 1 });

            const predictions = [];
            for (let row of items.slice(1)) {
                const text = row[0];  
                const response = await axios.post('http://localhost:5000/predict', { text });
                predictions.push(response.data.prediction);
            }

            const labeledData = items.slice(1).map((item, index) => [...item, predictions[index]]);
            setUploadedData(labeledData);
        };

        reader.readAsBinaryString(file);
    };

    const handleDownload = () => {
        const ws = XLSX.utils.aoa_to_sheet([['Textos_espanol', 'sdg'], ...uploadedData]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "ConClasificaciones.xlsx");
    };

    const filteredHistory = filter === 'all' ? history : history.filter(record => record.prediction.toString() === filter);

    return (
        <div className="container mt-5 app-container">
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
            <div>
                <button className="btn btn-primary mb-3 me-2" onClick={handlePredict}>Clasificar</button>
                <input type="file" accept=".xlsx" onChange={handleFileUpload} />
                <button className="btn btn-secondary ml-2" onClick={handleDownload}>Descargar con Clasificaciones</button>
            </div>
            {prediction !== null && <p className="mb-4">Clasificacion: {prediction}</p>}
            <hr></hr>

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
            <hr></hr>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Texto asociado a un ODS insertado</th>
                        <th>Clasificacion de acuerdo a su ODS</th>
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

            <hr></hr>
            <h1>Informacion de los ODS (3,4,5) </h1>
            <div className="row mb-4">
                <div className="col-md-4">
                    <img 
                        img src={ods3Image} alt="ODS 3" 
                        className="img-fluid" 
                        style={{ width: '300px', height: '300px' }} 
                    />
                </div>
                <div className="col-md-8">
                    <h3>ODS 3: Salud y bienestar</h3>
                    <p>
                    Garantizar una vida sana y promover el bienestar para todos en todas las edades es esencial para el desarrollo sostenible.
                                   </p>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-4">
                    <img 
                        img src={ods4Image} alt="ODS 4"
                        className="img-fluid" 
                        style={{ width: '300px', height: '300px' }} 
                    />
                </div>
                <div className="col-md-8">
                    <h3>ODS 4: Educación de calidad</h3>
                    <p>
                    Garantizar una educación inclusiva, equitativa y de calidad y promover oportunidades de aprendizaje durante toda la vida para todos.
                    </p>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-4">
                    <img 
                        img src={ods5Image} alt="ODS 5"
                        className="img-fluid" 
                        style={{ width: '300px', height: '300px' }} 
                    />
                </div>
                <div className="col-md-8">
                    <h3>ODS 5: Igualdad de género</h3>
                    <p>
                        Lograr la igualdad entre los géneros y empoderar a todas las mujeres y niñas.
                    </p>
                </div>
            </div>
        </div>


        
    );
}

export default App;
