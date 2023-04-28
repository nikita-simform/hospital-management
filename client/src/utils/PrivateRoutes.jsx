import { Outlet, Navigate } from "react-router";
import Header from "../components/Header";

const PrivateRoutes = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PrivateRoutes;
