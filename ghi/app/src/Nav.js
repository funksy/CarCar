import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          CarCar
        </Link>
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
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                Manufacturer
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/inventory/manufacturers">
                    Manufacturer List
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/inventory/manufacturers/new">
                    New Manufacturer
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                Model
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/inventory/models">
                    Model List
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/inventory/models/new">
                    New Model
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                Automobile
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/inventory/automobiles">
                    Automobile List
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/inventory/automobiles/new">
                    New Automobile
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                Salespeople
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/salespeople">
                    Salespeople List
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/salespeople/new">
                    New Salesperson
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/salespeople/history">
                    Salespeople History
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                Customers
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/customers">
                    Customer List
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/customers/new">
                    New Customer
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                Sales
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/sales">
                    Sales List
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/sales/new">
                    New Sales
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                Technicians
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/technicians">
                    Technician List
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/technicians/new">
                    New Technician
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                Appointments
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/appointments">
                    Appointment List
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/appointments/new">
                    New Appointment
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/appointments/history">
                    Appointment History
                  </Link>
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
