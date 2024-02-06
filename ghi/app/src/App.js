import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

import ManufacturerList from './inventory/ManufacturerList'
import NewManufacturerForm from './inventory/NewManufacturerForm'
import ModelList from './inventory/ModelList'
import NewModelForm from './inventory/NewModelForm'
import AutomobileList from './inventory/AutomobileList'
import NewAutoMobileForm from './inventory/NewAutomobileForm'

import NewSaleForm from './sales/NewSaleForm'
import NewSalespersonForm from './sales/NewSalespersonForm'
import NewCustomerForm from './sales/NewCustomerForm'
import SalespeopleList from './sales/SalespeopleList'
import SalespeopleHistoryList from './sales/SalespeopleHistoryList'
import CustomerList from './sales/CustomerList'
import SalesList from './sales/SalesList'

import AppointmentsList from "./service/AppointmentsList";
import AppointmentForm from "./service/AppointmentForm";
import AppointmentsHistory from "./service/AppointmentsHistory";
import TechniciansList from "./service/TechniciansList";
import TechnicianForm from "./service/TechnicianForm";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="inventory">
            <Route path="manufacturers">
              <Route path="" element={<ManufacturerList/>}/>
              <Route path="new" element={<NewManufacturerForm/>}/>
            </Route>
            <Route path="models">
              <Route path="" element={<ModelList/>}/>
              <Route path="new" element={<NewModelForm/>}/>
            </Route>
            <Route path="automobiles">
              <Route path="" element={<AutomobileList/>}/>
              <Route path="new" element={<NewAutoMobileForm/>}/>
            </Route>
          </Route>
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
            <Route path="" element={<SalesList/>} />
            <Route path="new" element={<NewSaleForm/>} />
          </Route>

          <Route path="salespeople">
            <Route path="" element={<SalespeopleList/>} />
            <Route path="new" element={<NewSalespersonForm/>} />
            <Route path="history" element={<SalespeopleHistoryList/>} />
          </Route>

          <Route path="customers">
            <Route path="" element={<CustomerList/>} />
            <Route path="new" element={<NewCustomerForm/>} />
          </Route>

          <Route path="inventory" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
