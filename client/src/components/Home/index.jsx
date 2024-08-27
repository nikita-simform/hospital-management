import { Image } from "antd";
import hospitalImage from "../../assets/hospital.webp";
import Footer from "../Footer";
import Header from "../Header";

function Home() {
  return (
    <>
      <Header />
      <div className="container">
        <Image src={hospitalImage} height={700} width={1900} />
        <p>Welcome to hospital management portal test</p>
      </div>
      <Footer />
    </>
  );
}


export default Home;
