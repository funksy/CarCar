import { useState, useEffect } from 'react';

function SalesList() {
    const [sales, setSales] = useState([])


    const fetchSales = async () => {
        const salesUrl = '	http://localhost:8090/api/sales/'
        const response = await fetch(salesUrl)
        if (response.ok) {
            const sales = await response.json()
            setSales(sales)
        }
    }


    useEffect(() => {
        fetchSales()
    }, [])


    return (
        <div className='row'>
            <div className="shadow p-4 mt-4">
                <h1>Sales</h1>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Salesperson ID</th>
                            <th>Salesperson Name</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sale => {
                            return (
                                <tr key={sale.id}>
                                    <td>{sale.salesperson.employee_id}</td>
                                    <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                    <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>${sale.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SalesList
