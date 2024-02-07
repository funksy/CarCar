import { useState, useEffect } from 'react';

function SalespeopleHistoryList() {
    const [salespeople, setSalespeople] = useState([])
    const [sales, setSales] = useState([])
    const [salesperson, setSalesperson] = useState(0)
    let filteredSales = sales

    for (const sale of sales) {
        if (salesperson) {
            filteredSales = sales.filter((sale) => sale.salesperson.id === salesperson)
        }
    }

    const fetchData = async () => {
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/'
        const salespeopleResponse = await fetch(salespeopleUrl)
        if (salespeopleResponse.ok) {
            const salespeople = await salespeopleResponse.json()
            setSalespeople(salespeople)
        }

        const salesUrl = '	http://localhost:8090/api/sales/'
        const salesResponse = await fetch(salesUrl)
        if (salesResponse.ok) {
            const sales = await salesResponse.json()
            setSales(sales)
        }
    }


    useEffect(() => {
        fetchData()
    }, [])


    const handleSalespersonChange = (e) => {
        setSalesperson(parseInt(e.target.value))
    }



    return (
        <div className='row'>
            <div className="shadow p-4 mt-4">
                <h1>Salesperson Sale History</h1>
                <div className="form-floating mb-3">
                    <select onChange={handleSalespersonChange} required id="salesperson"
                    className="form-select" name="salesperson" value={salesperson.employee_id}>
                        <option value="">Choose a Salesperson</option>
                        {salespeople.map(salesperson => {
                            return (
                                <option key={salesperson.id} value={salesperson.id}>
                                    {salesperson.first_name} {salesperson.last_name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Salesperson</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSales.map(sale => {
                            return (
                                <tr key={sale.id}>
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

export default SalespeopleHistoryList
