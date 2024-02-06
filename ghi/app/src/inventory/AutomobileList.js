import { useState, useEffect } from 'react';

function AutomobileList() {
    const [automobiles, setAutomobiles] = useState([])

    const fetchAutomobiles = async () => {
        const automobilesUrl = 'http://localhost:8100/api/automobiles/'
        const response = await fetch(automobilesUrl)
        if (response.ok) {
            const automobiles = await response.json()
            setAutomobiles(automobiles.autos)
        }
    }


    useEffect(() => {
        fetchAutomobiles()
    }, [])

    return (
        <div className='row'>
            <div className="shadow p-4 mt-4">
                <h1>Models</h1>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Color</th>
                            <th>Year</th>
                            <th>Model</th>
                            <th>Manufacturer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {automobiles.map(auto => {
                            return (
                                <tr key={auto.id}>
                                    <td>{auto.vin}</td>
                                    <td>{auto.color}</td>
                                    <td>{auto.year}</td>
                                    <td>{auto.model.name}</td>
                                    <td>{auto.model.manufacturer.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AutomobileList
