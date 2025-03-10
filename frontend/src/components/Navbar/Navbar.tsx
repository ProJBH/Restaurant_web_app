import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.scss";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // 假设登录后将用户 email 保存在 localStorage 中
      const email = localStorage.getItem("userEmail");
      setUserEmail(email ? email : "User");
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleUserClick = () => {
    // 当已登录时，点击跳转到 admin dashboard
    if (isLoggedIn) {
      navigate("/admin/dashboard");
    }
  };

  return (
    <nav className={`navbar navbar-expand-md fixed-top ${styles.navbarCustom}`}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src="/assets/Logo.jpg" alt="Restaurant Logo" />
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
                to="/aboutus"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? ` ${styles.active}` : "")
                }
              >
                About Us
              </NavLink>
            </li>
          </ul>
          {isLoggedIn ? (
            // 已登录时，显示 "Hello, {userEmail}"，点击跳转到 /admin/dashboard
            <div
              onClick={handleUserClick}
              className={`d-flex align-items-center ${styles.loginLink}`}
              style={{ cursor: "pointer" }}
            >
              <img src="/assets/Login.png" alt="User" className={styles.loginIcon} />
              <span className={styles.loginText}>Hello, {userEmail}</span>
            </div>
          ) : (
            // 未登录时，显示 "Login" 链接
            <Link to="/login" className={`d-flex align-items-center ${styles.loginLink}`}>
              <img src="/assets/Login.png" alt="Login" className={styles.loginIcon} />
              <span className={styles.loginText}>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
