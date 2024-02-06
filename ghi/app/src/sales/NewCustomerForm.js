import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewCustomerForm() {
    const initialForm = {
        first_name: '',
        last_name: '',
        address: '',
        phone_number: ''
    }
    const [formData, setFormData] = useState(initialForm)


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

        const CustomerUrl = 'http://localhost:8090/api/customers/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const response = await fetch(CustomerUrl, fetchConfig)
        if (response.ok) {
            const newCustomer = await response.json()
            setFormData(initialForm)
        }
    }

    return (
        <div className='row'>
            <div className='offset-3 col-6'>
                <div className='shadow p-4 mt-4'>
                    <h1>Add a customer</h1>
                    <form onSubmit={handleSubmit} id='create-customer-form'>
                        <div className='form-floating mb-3'>
                            <input onChange={handleFormChange}placeholder='First Name'
                            required type='text' id='first_name' className='form-control'
                            name='first_name' value={formData.first_name}/>
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input onChange={handleFormChange}placeholder='Last Name'
                            required type='text' id='last_name' className='form-control'
                            name='last_name' value={formData.last_name}/>
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input onChange={handleFormChange}placeholder='Address' required
                            type='text' id='address' className='form-control'
                            name='address' value={formData.address}/>
                            <label htmlFor="address">Address</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input onChange={handleFormChange}placeholder='Phone Number'
                            required type='text' id='phone_number' className='form-control'
                            name='phone_number' value={formData.phone_number}/>
                            <label htmlFor="phone_number">Phone Number</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewCustomerForm
