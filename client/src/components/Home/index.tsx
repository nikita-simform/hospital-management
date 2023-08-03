import React from "react";
import { Image } from "antd";
import hospitalImage from "../../assets/hospital.webp";
import Header from "../Header";
import Footer from "../Footer";

function Home() {
  return (
    <>
      <Header />
      <div className="container">
        <Image src={hospitalImage} height={700} width={1900} />
        <p>Welcome to hospital management portal</p>
      </div>
      <Footer/>
    </>
  );
}


export default Home;
