import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import NewSaleForm from './sales/NewSaleForm'

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
          <Route path="inventory" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
