import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";

export default function Applayout() {
  const { isLoading } = useSelector((store) => store.budget);

  return (
    <>
      <Navbar />
      {isLoading && <Spinner />}

      <Outlet />
      <Footer />
    </>
  );
}
