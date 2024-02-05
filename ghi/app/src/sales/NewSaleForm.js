import React, { useEffect, useState } from 'react';


function NewSaleForm() {
    const initialForm = {
        vin: '',
        employee_id: '',
        customer_id: '',
        price: ''
    }
    const [vins, setVins] = useState([])
    const [salespeople, setSalespeople] = useState([])
    const [customers, setCustomers] = useState([])
    const [formData, setFormData] = useState(initialForm)


    const fetchData = async () => {
        const vinsUrl = 'http://localhost:8090/api/auto_vos/'
        const vinsResponse = await fetch(vinsUrl)
        if (vinsResponse.ok) {
            const vinsData = await vinsResponse.json()
            setVins(vinsData)
        }

        const salespeopleUrl = 'http://localhost:8090/api/salespeople/'
        const salespeopleResponse = await fetch(salespeopleUrl)
        if (salespeopleResponse.ok) {
            const salespeopleData = await salespeopleResponse.json()
            setSalespeople(salespeopleData)
        }

        const customersUrl = 'http://localhost:8090/api/customers/'
        const customersResponse = await fetch(customersUrl)
        if (customersResponse.ok) {
            const customersData = await customersResponse.json()
            setCustomers(customersData)
        }
    }


    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a new sale</h1>
                    <form id="create-sale-form">
                        <div className="form-floating mb-3">
                            <select required id="vin" className="form-select" name="vin">
                                <option value="">Choose a VIN</option>
                                {vins.map(vin => {
                                    return (
                                        <option key={vin.vin} value={vin.vin}>
                                            {vin.vin}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <select required id="employee" className="form-select" name="employee">
                                <option value="">Choose a Salesperson</option>
                                {salespeople.map(salesperson => {
                                    return (
                                        <option key={salesperson.id} value={salesperson.id}>
                                            {salesperson.first_name} {salesperson.last_name}, #{salesperson.employee_id}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <select required id="customer" className="form-select" name="customer">
                                <option value="">Choose a Customer</option>
                                {customers.map(customer => {
                                    return (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.first_name} {customer.last_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input placeholder="Price"
                            required type="number" id="price" className="form-control"
                            name="price"/>
                            <label htmlFor="price">Sale Price</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default NewSaleForm
