import React from "react";
import PropTypes from "prop-types";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { apiService } from "../../services/apiService";
import { useNavigate } from "react-router-dom";

function Header({ isUserLoggedIn = false }) {
  let navigate = useNavigate();

  const logout=()=>{
    apiService.logout().then(()=>{
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
            <a href="/sign-up">Sign up</a>
          </nav>
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  isUserLoggedIn: PropTypes.boolean
};

export default Header;
