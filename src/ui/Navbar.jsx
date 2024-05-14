import { Link } from "react-router-dom";
import Button from "./Button";
import { useLogout } from "../features/Authentication/useLogout";

export default function Navbar() {
  const { logout } = useLogout();
  return (
    <header className="bg-cyan-500 text-blue-600/100 p-8  w-screen cls bg-fixed">
      <ul className="flex justify-around text-[#FFFFFF] ul_gap navLayout text-lg">
        <Link
          to="/"
          className="hover:text-[#0000FF] hover:bg-[#FFFFFF] p-2 rounded-full border-white shadow-[#FFFFFF]/200"
        >
          <span className="text-[1rem] me-3">💒</span>
          Z&apos;s ExpenseTracker{" "}
        </Link>
        <span className="flex flex-row-reverse space-x-10 space-x-reverse ">
          <Button
            onClick={logout}
            className="hover:text-[#0000FF] hover:bg-[#FFFFFF] p-2 rounded-full border-white shadow-[#FFFFFF]/200"
          >
            Logout
          </Button>
          <Link
            to="/login"
            className="hover:text-[#0000FF] hover:bg-[#FFFFFF] p-2 rounded-full border-white shadow-[#FFFFFF]/200"
          >
            <span>👨🏿‍🤝‍👨🏿</span> Login{" "}
          </Link>
          <Link
            to="/budget"
            className="hover:text-[#0000FF] hover:bg-[#FFFFFF] p-2 rounded-full border-white shadow-[#FFFFFF]/200"
          >
            <span className="">💰</span> Budget
          </Link>
        </span>
      </ul>
    </header>
  );
}
