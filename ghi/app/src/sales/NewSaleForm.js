import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function NewSaleForm() {
    const initialForm = {
        vin: '',
        salesperson_id: '',
        customer_id: '',
        price: ''
    }
    const [vins, setVins] = useState([])
    const [salespeople, setSalespeople] = useState([])
    const [customers, setCustomers] = useState([])
    const [formData, setFormData] = useState(initialForm)
    const navigate = useNavigate()


    const fetchData = async () => {
        const vinsUrl = 'http://localhost:8090/api/auto_vos/'
        const vinsResponse = await fetch(vinsUrl)

        const salesUrl = '	http://localhost:8090/api/sales/'
        const salesResponse = await fetch(salesUrl)

        if (vinsResponse.ok && salesResponse.ok) {
            const vinsData = await vinsResponse.json()
            const sales = await salesResponse.json()
            const soldVins = []
            for (const sale of sales) {
                soldVins.push(sale.automobile.vin)
            }
            const unsoldVins = []
            for (const vin of vinsData) {
                if (!soldVins.includes(vin.vin)) {
                    unsoldVins.push(vin)
                }
            }
            setVins(unsoldVins)
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


    const handleFormChange = (e) => {
        const value = e.target.value
        const inputName = e.target.name

        setFormData({
            ...formData,
            [inputName]: value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        const SaleUrl = 'http://localhost:8090/api/sales/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const response = await fetch(SaleUrl, fetchConfig)
        if (response.ok) {
            const newSale = await response.json()
            console.log(newSale)
            setFormData(initialForm)
        }
        navigate('/sales')
    }


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a new sale</h1>
                    <form onSubmit={handleSubmit} id="create-sale-form">
                        <div className="form-floating mb-3">

                            <select onChange={handleFormChange} required id="vin"
                            className="form-select" name="vin" value={formData.vin}>
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
                            <select onChange={handleFormChange} required id="salesperson_id"
                            className="form-select" name="salesperson_id" value={formData.salesperson_id}>
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
                            <select onChange={handleFormChange} required id="customer_id"
                            className="form-select" name="customer_id" value={formData.customer_id}>
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
                            <input onChange={handleFormChange} placeholder="Price"
                            required type="number" id="price" className="form-control"
                            name="price" value={formData.price}/>
                            <label htmlFor="price">Sale Price</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default NewSaleForm
