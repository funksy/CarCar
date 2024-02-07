import { useEffect, useState } from "react";
import PopUpAlert from "../commonComponents/PopUpAlert";
import AlertConfig from "../commonComponents/AlertConfig";
import { useNavigate } from "react-router-dom";

function AppointmentForm() {
  const DEFAULT_FORM_DATA = {
    date_time: "",
    reason: "",
    vin: "",
    customer: "",
    technician: "",
  };
  const DEFAULT_DATETIME = {
    date: "",
    time: "",
  };

  const [technicians, setTechnicians] = useState([]);
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [dateTime, setDateTime] = useState(DEFAULT_DATETIME);
  const [alertConfig, setAlertConfig] = useState(AlertConfig("default"));
  const navigate = useNavigate();

  const initialData = () => {
    setFormData(DEFAULT_FORM_DATA);
    setDateTime(DEFAULT_DATETIME);
  };

  const handleDateOrTimeChanged = (e) => {
    const changedElement = e.target;
    const newDateTime = {
      ...dateTime,
      [changedElement.name]: changedElement.value,
    };
    setDateTime(newDateTime);
    const date_time = `${newDateTime.date}T${newDateTime.time}`;
    setFormData({ ...formData, ["date_time"]: date_time });
  };
  const handleDataChange = (e) => {
    const changedElement = e.target;
    setFormData({ ...formData, [changedElement.name]: changedElement.value });
  };

  const fetchData = async () => {
    const url = "http://localhost:8080/api/technicians/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setTechnicians(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigate = (param1) => {
    setAlertConfig(param1);
    navigate("/appointments");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8080/api/appointments/";
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
      setAlertConfig(AlertConfig("success", handleNavigate));
    } else {
      setAlertConfig(AlertConfig("failure"));
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new Appointment</h1>
          <form onSubmit={handleSubmit} id="create-hat-form">
            <PopUpAlert config={alertConfig} />
            <div className="form-floating mb-3">
              <input
                onChange={handleDataChange}
                value={formData.vin}
                placeholder="Automobile VIN"
                required
                type="text"
                id="vin"
                className="form-control"
                name="vin"
              />
              <label htmlFor="vin">Automobile VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleDataChange}
                value={formData.customer}
                placeholder="customer"
                required
                type="text"
                id="customer"
                className="form-control"
                name="customer"
              />
              <label htmlFor="customer">Customer</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleDateOrTimeChanged}
                value={dateTime.date}
                min={new Date().toISOString().split("T")[0]}
                placeholder="Date"
                required
                type="date"
                id="date"
                className="form-control"
                name="date"
              />
              <label htmlFor="date">Date</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleDateOrTimeChanged}
                value={dateTime.time}
                placeholder="Time"
                required
                type="time"
                id="time"
                className="form-control"
                name="time"
              />
              <label htmlFor="time">Time</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleDataChange}
                value={formData.reason}
                placeholder="Reason"
                required
                type="text"
                id="reason"
                className="form-control"
                name="reason"
              />
              <label htmlFor="reason">Reason</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleDataChange}
                value={formData.technician}
                required
                id="technician"
                className="form-select"
                name="technician"
              >
                <option value="">Choose a technician</option>
                {technicians.map((technician) => {
                  return (
                    <option key={technician.id} value={technician.id}>
                      {technician.full_name}
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

export default AppointmentForm;
