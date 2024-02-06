import React, { useEffect, useState } from 'react';

function NewAutoMobileForm() {
    const initialForm = {
        color: '',
        year: '',
        vin: '',
        model_id: ''
    }
    const [formData, setFormData] = useState(initialForm)
    const [models, setmodels] = useState([])


    const fetchModels = async () => {
        const modelsUrl = 'http://localhost:8100/api/models/'
        const response = await fetch(modelsUrl)
        if (response.ok) {
            const models = await response.json()
            setmodels(models.models)
        }
    }


    useEffect(() => {
        fetchModels()
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

        const automobilesUrl = 'http://localhost:8100/api/automobiles/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const response = await fetch(automobilesUrl, fetchConfig)
        if (response.ok) {
            const newAutomobile = await response.json()
            setFormData(initialForm)
        }
    }

    return (
        <div className='row'>
            <div className='offset-3 col-6'>
                <div className='shadow p-4 mt-4'>
                    <h1>Add an automobile</h1>
                    <form onSubmit={handleSubmit} id='create-automobile-form'>
                        <div className='form-floating mb-3'>
                            <input onChange={handleFormChange} placeholder='Color'
                            required type='text' id='color' className='form-control'
                            name='color' value={formData.color}/>
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input onChange={handleFormChange} placeholder='Year'
                            required type='text' id='year' className='form-control'
                            name='year' value={formData.year}/>
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input onChange={handleFormChange} placeholder='VIN'
                            required type='text' id='vin' className='form-control'
                            name='vin' value={formData.vin}/>
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select onChange={handleFormChange} required id="model_id"
                            className="form-select" name="model_id" value={formData.model_id}>
                                <option value="">Choose a model</option>
                                {models.map(model => {
                                    return (
                                        <option key={model.name} value={model.id}>
                                            {model.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewAutoMobileForm
