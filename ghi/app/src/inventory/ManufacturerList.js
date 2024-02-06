import { useState, useEffect } from 'react';

function ManufacturerList() {
    const [manufacturers, setManufacturers] = useState([])

    const fetchManufacturers = async () => {
        const manufacturersUrl = 'http://localhost:8100/api/manufacturers/'
        const response = await fetch(manufacturersUrl)
        if (response.ok) {
            const manufacturers = await response.json()
            setManufacturers(manufacturers.manufacturers)
        }
    }


    useEffect(() => {
        fetchManufacturers()
    }, [])

    return (
        <div className='row'>
            <div className="shadow p-4 mt-4">
                <h1>Manufacturers</h1>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {manufacturers.map(manufacturer => {
                            return (
                                <tr key={manufacturer.id}>
                                    <td>{manufacturer.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManufacturerList
