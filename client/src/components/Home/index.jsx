import React from "react";
import PropTypes from "prop-types";
import { Image } from "antd";
import hospitalImage from "../../assets/hospital.webp";
import Header from "../Header";
import Footer from "../Footer";
import PatientList from "../PatientList";

function Home(props) {
  return (
    <>
      <Header/>
      <div class="container">
        <Image src={hospitalImage} height={700} width={1700}/>
        <p>Welcome to hospital management portal</p>
      </div>
      <Footer/>
    </>
  );
}

Home.propTypes = {};

export default Home;
