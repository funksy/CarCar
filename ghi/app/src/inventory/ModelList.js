import { useState, useEffect } from 'react';

function ModelList() {
    const [models, setModels] = useState([])

    const fetchModels = async () => {
        const modelsUrl = 'http://localhost:8100/api/models/'
        const response = await fetch(modelsUrl)
        if (response.ok) {
            const manufacturers = await response.json()
            setModels(manufacturers.models)
        }
    }


    useEffect(() => {
        fetchModels()
    }, [])

    return (
        <div className='row'>
            <div className="shadow p-4 mt-4">
                <h1>Models</h1>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Manufacturer</th>
                            <th>Picture</th>
                        </tr>
                    </thead>
                    <tbody>
                        {models.map(model => {
                            return (
                                <tr key={model.id}>
                                    <td>{model.name}</td>
                                    <td>{model.manufacturer.name}</td>
                                    <td><img src={model.picture_url} height="80" width="auto"/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ModelList
