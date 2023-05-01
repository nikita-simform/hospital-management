import { Outlet, Navigate } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getLocalStorage } from "./storage";

const PrivateRoutes = () => {
  const token = getLocalStorage("token");
  return (
    <>
      <Header isUserLoggedIn={token} />
      {token?<Outlet />:<Navigate to="/login"/>}
      <Footer />
    </>
  );
};

export default PrivateRoutes;
