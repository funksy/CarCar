import React, { useEffect, useState } from "react";
import PopUpAlert from "../commonComponents/PopUpAlert";
import { useNavigate } from "react-router-dom";

function NewManufacturerForm() {
  const initialForm = {
    name: "",
  };
  const DEFAULT_ALERT_CONFIG = {
    isShow: false,
    style: "",
    message: "",
    autoReset: false,
  };
  const [formData, setFormData] = useState(initialForm);
  const navigate = useNavigate();
  const [alertConfig, setAlertConfig] = useState(DEFAULT_ALERT_CONFIG);

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
    navigate("/inventory/manufacturers");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const manufacturerUrl = "http://localhost:8100/api/manufacturers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(manufacturerUrl, fetchConfig);
    if (response.ok) {
      const newManufacturer = await response.json();
      setFormData(initialForm);
      setAlertConfig({
        isShow: true,
        style: "success",
        message: "Manufacturer has been created successfully! Redirecting now!",
        autoReset: 3000,
        resetFunc: handleNavigate,
        defaultConfig: DEFAULT_ALERT_CONFIG,
      });
    } else {
      setAlertConfig({
        isShow: true,
        style: "danger",
        message: "Failed to create an manufacturer!",
        autoReset: false,
      });
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a manufacturer</h1>
          <form onSubmit={handleSubmit} id="create-manufacturer-form">
            <PopUpAlert config={alertConfig} />
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Manufacturer Name"
                required
                type="text"
                id="name"
                className="form-control"
                name="name"
                value={formData.name}
              />
              <label htmlFor="name">Manufacturer Name</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewManufacturerForm;
