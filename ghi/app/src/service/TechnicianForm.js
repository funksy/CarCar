import { useEffect, useState } from "react";
import PopUpAlert from "../commonComponents/PopUpAlert";

function TechnicianForm() {
  const DEFAULT_FORM_DATA = {
    first_name: "",
    last_name: "",
    employee_id: "",
  };

  const DEFAULT_ALERT_CONFIG = {
    isShow: false,
    style: "",
    message: "",
    autoReset: false,
  };

  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [alertConfig, setAlertConfig] = useState(DEFAULT_ALERT_CONFIG);

  const initialData = () => {
    setFormData(DEFAULT_FORM_DATA);
  };

  const handleDataChange = (e) => {
    const changedElement = e.target;
    setFormData({ ...formData, [changedElement.name]: changedElement.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8080/api/technicians/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      header: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      initialData();
      setAlertConfig({
        isShow: true,
        style: "success",
        message: "Technician has been added successfully!",
        autoReset: 3000,
        resetFunc: setAlertConfig,
        defaultConfig: DEFAULT_ALERT_CONFIG,
      });
    } else {
      setAlertConfig({
        isShow: true,
        style: "danger",
        message: "Failed to add the technician!",
        autoReset: false,
      });
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Technician</h1>
          <form onSubmit={handleSubmit} id="create-hat-form">
            <PopUpAlert config={alertConfig} />
            <div className="form-floating mb-3">
              <input
                onChange={handleDataChange}
                value={formData.first_name}
                placeholder="First Name"
                required
                type="text"
                id="first-name"
                className="form-control"
                name="first_name"
              />
              <label htmlFor="first-name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleDataChange}
                value={formData.last_name}
                placeholder="Last Name"
                required
                type="text"
                id="last-name"
                className="form-control"
                name="last_name"
              />
              <label htmlFor="last-name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleDataChange}
                value={formData.employee_id}
                placeholder="Employee Id"
                required
                type="text"
                id="employee-id"
                className="form-control"
                name="employee_id"
              />
              <label htmlFor="employee-id">Employee Id</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TechnicianForm;
