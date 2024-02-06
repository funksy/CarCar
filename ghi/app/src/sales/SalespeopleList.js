import { useState, useEffect } from 'react';

function SalespeopleList() {
    const [salespeople, setSalespeople] = useState([])


    const fetchSalespeople = async () => {
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/'
        const response = await fetch(salespeopleUrl)
        if (response.ok) {
            const salespeople = await response.json()
            setSalespeople(salespeople)
        }
    }


    useEffect(() => {
        fetchSalespeople()
    }, [])


    return (
        <div className='row'>
            <div className="shadow p-4 mt-4">
                <h1>Salespeople</h1>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salespeople.map(salesperson => {
                            return (
                                <tr key={salesperson.id}>
                                    <td>{salesperson.employee_id}</td>
                                    <td>{salesperson.first_name}</td>
                                    <td>{salesperson.last_name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SalespeopleList
