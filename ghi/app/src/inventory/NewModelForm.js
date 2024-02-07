import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUpAlert from "../commonComponents/PopUpAlert";

function NewModelForm() {
  const initialForm = {
    name: "",
    picture_url: "",
    manufacturer_id: "",
  };
  const DEFAULT_ALERT_CONFIG = {
    isShow: false,
    style: "",
    message: "",
    autoReset: false,
  };
  const [formData, setFormData] = useState(initialForm);
  const [manufacturers, setManufacturers] = useState([]);
  const [alertConfig, setAlertConfig] = useState(DEFAULT_ALERT_CONFIG);
  const navigate = useNavigate();

  const fetchManufacturers = async () => {
    const manufacturersUrl = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(manufacturersUrl);
    if (response.ok) {
      const manufacturers = await response.json();
      setManufacturers(manufacturers.manufacturers);
    }
  };

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  const handleNavigate = (param1) => {
    setAlertConfig(param1);
    navigate("/inventory/models");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const modelUrl = "http://localhost:8100/api/models/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(modelUrl, fetchConfig);
    if (response.ok) {
      const newManufacturer = await response.json();
      setFormData(initialForm);
      setAlertConfig({
        isShow: true,
        style: "success",
        message: "Model has been created successfully! Redirecting now!",
        autoReset: 3000,
        resetFunc: handleNavigate,
        defaultConfig: DEFAULT_ALERT_CONFIG,
      });
    } else {
      setAlertConfig({
        isShow: true,
        style: "danger",
        message: "Failed to create an model!",
        autoReset: false,
      });
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a model</h1>
          <form onSubmit={handleSubmit} id="create-model-form">
            <PopUpAlert config={alertConfig} />
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Model Name"
                required
                type="text"
                id="name"
                className="form-control"
                name="name"
                value={formData.name}
              />
              <label htmlFor="name">Model Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Picture URL"
                required
                type="text"
                id="picture_url"
                className="form-control"
                name="picture_url"
                value={formData.picture_url}
              />
              <label htmlFor="picture_url">Picture URL</label>
            </div>
            <div className="form-floating mb-3">
              <select
                onChange={handleFormChange}
                required
                id="manufacturer_id"
                className="form-select"
                name="manufacturer_id"
                value={formData.manufacturer_id}
              >
                <option value="">Choose a manufacturer</option>
                {manufacturers.map((manufacturer) => {
                  return (
                    <option key={manufacturer.name} value={manufacturer.id}>
                      {manufacturer.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewModelForm;
