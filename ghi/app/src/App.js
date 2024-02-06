import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import NewSaleForm from './sales/NewSaleForm'
import NewSalespersonForm from './sales/NewSalespersonForm'
import NewCustomerForm from './sales/NewCustomerForm'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="service"/>
          <Route path="sales">
            <Route path="new" element={<NewSaleForm/>}/>
          </Route>
          <Route path="salespeople">
            <Route path="new" element={<NewSalespersonForm/>}/>
          </Route>
          <Route path="customers">
            <Route path="new" element={<NewCustomerForm/>}/>
          </Route>
          <Route path="inventory" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
