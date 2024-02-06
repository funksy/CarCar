import { useEffect, useState } from "react";
import PopUpAlert from "../commonComponents/PopUpAlert";

function AppointmentsList() {
  const DEFAULT_ALERT_CONFIG = {
    isShow: false,
    style: "",
    message: "",
    autoReset: false,
  };

  const [appointments, setAppointments] = useState([]);
  const [alertConfig, setAlertConfig] = useState(DEFAULT_ALERT_CONFIG);

  const handleUpdate = async (e) => {
    const appointmentId = e.target.dataset.appointmentId;
    const appointmentStatus = e.target.dataset.appointmentStatus;
    const url = `http://localhost:8080/api/appointments/${appointmentId}/`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify({
        status: appointmentStatus,
      }),
      header: {
        "Content-Type": "Application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setAlertConfig({
        isShow: true,
        style: "success",
        message: `Appointment is ${appointmentStatus} now!`,
        autoReset: 3000,
        resetFunc: setAlertConfig,
        defaultConfig: DEFAULT_ALERT_CONFIG,
      });
      fetchData();
    } else {
      setAlertConfig({
        isShow: true,
        style: "danger",
        message: "Action Failed!",
        autoReset: false,
      });
    }
  };

  const fetchData = async () => {
    const url = "	http://localhost:8080/api/appointments/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAppointments(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="mt-4 mb-4">Service Appointments</h1>
      <table className="table table-striped text-center">
        <thead>
          <tr className={alertConfig.isShow ? "" : "d-none"}>
            <th colSpan="8">
              <PopUpAlert config={alertConfig} />
            </th>
          </tr>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => {
            if (appointment.status === "scheduled") {
              return (
                <tr key={appointment.id}>
                  <td>{appointment.vin}</td>
                  <td>{appointment.is_vip}</td>
                  <td>{appointment.customer}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.technician.full_name}</td>
                  <td>{appointment.reason}</td>
                  <td>
                    <button
                      data-appointment-status="Cancelled"
                      data-appointment-id={appointment.id}
                      type="button"
                      className="btn btn-danger"
                      onClick={handleUpdate}
                    >
                      Cancel
                    </button>
                    <button
                      data-appointment-status="Finished"
                      data-appointment-id={appointment.id}
                      type="button"
                      className="btn btn-success"
                      onClick={handleUpdate}
                    >
                      Finish
                    </button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
}

export default AppointmentsList;
