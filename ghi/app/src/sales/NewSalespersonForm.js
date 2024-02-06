import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewSalesperson() {
    const initialForm = {
        first_name: '',
        last_name: '',
        employee_id: ''
    }
    const [formData, setFormData] = useState(initialForm)
    const navigate = useNavigate()


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

        const SalespersonUrl = 'http://localhost:8090/api/salespeople/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const response = await fetch(SalespersonUrl, fetchConfig)
        if (response.ok) {
            const newSalesperson = await response.json()
            setFormData(initialForm)
        }
        navigate('/salespeople')
    }


    return (
        <div className='row'>
            <div className='offset-3 col-6'>
                <div className='shadow p-4 mt-4'>
                    <h1>Add a salesperson</h1>
                    <form onSubmit={handleSubmit} id='create-salesperson-form'>
                        <div className='form-floating mb-3'>
                            <input onChange={handleFormChange} placeholder='First Name'
                            required type='text' id='first_name' className='form-control'
                            name='first_name' value={formData.first_name}/>
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input onChange={handleFormChange} placeholder='Last Name'
                            required type='text' id='last_name' className='form-control'
                            name='last_name' value={formData.last_name}/>
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input onChange={handleFormChange} placeholder='Employee ID'
                            required type='text' id='employee_id' className='form-control'
                            name='employee_id' value={formData.employee_id}/>
                            <label htmlFor="employee_id">Employee ID</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewSalesperson
