import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          CarCar
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                Manufacturer
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/inventory/manufacturers">
                    Manufacturer List
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/inventory/manufacturers/new">
                    New Manufacturer
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                Model
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/inventory/models">
                    Model List
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/inventory/models/new">
                    New Model
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                Automobile
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/inventory/automobiles">
                    Automobile List
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/inventory/automobiles/new">
                    New Automobile
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                Salespeople
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/salespeople">
                    Salespeople List
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/salespeople/new">
                    New Salesperson
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/salespeople/history">
                    Salespeople History
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                Customers
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/customers">
                    Customer List
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/customers/new">
                    New Customer
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                Sales
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/sales">
                    Sales List
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/sales/new">
                    New Sales
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                Technicians
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/technicians">
                    Technician List
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/technicians/new">
                    New Technician
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                Appointments
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/appointments">
                    Appointment List
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/appointments/new">
                    New Appointment
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/appointments/history">
                    Appointment History
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
