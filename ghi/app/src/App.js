import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import AppointmentsList from "./service/AppointmentsList";
import AppointmentForm from "./service/AppointmentForm";
import AppointmentsHistory from "./service/AppointmentsHistory";
import TechniciansList from "./service/TechniciansList";
import TechnicianForm from "./service/TechnicianForm";
import NewSaleForm from "./sales/NewSaleForm";
import NewSalespersonForm from "./sales/NewSalespersonForm";
import NewCustomerForm from "./sales/NewCustomerForm";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="appointments">
            <Route path="" element={<AppointmentsList />} />
            <Route path="new" element={<AppointmentForm />} />
            <Route path="history" element={<AppointmentsHistory />} />
          </Route>

          <Route path="technicians">
            <Route path="" element={<TechniciansList />} />
            <Route path="new" element={<TechnicianForm />} />
          </Route>

          <Route path="sales">
            <Route path="new" element={<NewSaleForm />} />
          </Route>
          <Route path="salespeople">
            <Route path="new" element={<NewSalespersonForm />} />
          </Route>
          <Route path="customers">
            <Route path="new" element={<NewCustomerForm />} />
          </Route>
          <Route path="inventory" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
