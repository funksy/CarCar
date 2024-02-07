import { useState, useEffect } from 'react'

function CustomerList() {
    const [customers, setCustomers] = useState([])


    const fetchCustomers = async () => {
        const customersUrl = 'http://localhost:8090/api/customers/'
        const response = await fetch(customersUrl)
        if (response.ok) {
            const customers = await response.json()
            setCustomers(customers)
        }
    }


    useEffect(() => {
        fetchCustomers()
    }, [])


    return (
        <div className='row'>
            <div className="shadow p-4 mt-4">
                <h1>Customers</h1>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => {
                            return (
                                <tr key={customer.id}>
                                    <td>{customer.first_name}</td>
                                    <td>{customer.last_name}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.phone_number}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CustomerList
