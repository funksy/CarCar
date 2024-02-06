import { useEffect, useState } from "react";
function AppointmentsHistory() {
  const [appointments, setAppointments] = useState([]);
  const [searchVin, setSearchValue] = useState("");

  const handleSearchChanged = (e) => {
    setSearchValue(e.target.value);
  };

  const handleResetSearch = () => {
    setSearchValue("");
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

  const returnTemplate = (appointment) => {
    return (
      <tr key={appointment.id}>
        <td>{appointment.vin}</td>
        <td>{appointment.is_vip}</td>
        <td>{appointment.customer}</td>
        <td>{appointment.date}</td>
        <td>{appointment.time}</td>
        <td>{appointment.technician.full_name}</td>
        <td>{appointment.reason}</td>
        <td className="text-capitalize">{appointment.status}</td>
      </tr>
    );
  };

  return (
    <>
      <h1 className="mt-4 mb-4">Service History</h1>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by VIN..."
          value={searchVin}
          id="search-input"
          maxLength="17"
          onChange={handleSearchChanged}
        />
        {searchVin !== "" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="search-button"
            onClick={handleResetSearch}
          >
            Reset
          </button>
        )}
      </div>

      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => {
            if (searchVin.length === 0) {
              return returnTemplate(appointment);
            } else {
              if (appointment.vin.includes(searchVin)) {
                return returnTemplate(appointment);
              }
            }
          })}
        </tbody>
      </table>
    </>
  );
}
export default AppointmentsHistory;
