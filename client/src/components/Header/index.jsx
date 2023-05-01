import React from "react";
import PropTypes from "prop-types";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { apiService } from "../../sevices/apiService";
import { useNavigate } from "react-router-dom";
function Header({ isUserLoggedIn = false }) {
  let navigate = useNavigate();

  const logout=()=>{
    apiService.logout().then(resp=>{
      navigate("/login");
    })
  }
  return (
    <div className="fixed-header">
      <div className="container">
        {isUserLoggedIn ? (
          <nav>
          <Avatar icon={<UserOutlined />} />
          <a href="#" role="button" onClick={logout}>Logout</a>
          </nav>
        ) : (
          <nav>
            <a href="/login">Login</a>
            <a href="#">Sign up</a>
          </nav>
        )}
      </div>
    </div>
  );
}

Header.propTypes = {};

export default Header;
