// frontend/src/components/Navbar/Navbar.tsx
import { NavLink, Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

function Navbar() {
  return (
    <nav className={`navbar navbar-expand-md fixed-top ${styles.navbarCustom}`}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Restaurant
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  "nav-link" + (isActive ? ` ${styles.active}` : "")
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? ` ${styles.active}` : "")
                }
              >
                Menu
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/booking"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? ` ${styles.active}` : "")
                }
              >
                Book a Table
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/orderOnline"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? ` ${styles.active}` : "")
                }
              >
                Order Online
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? ` ${styles.active}` : "")
                }
              >
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/login"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? ` ${styles.active}` : "")
                }
              >
                Login
              </NavLink>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
