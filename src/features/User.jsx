import { useState } from "react";
import { useLogin } from "./Authentication/useLogin";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { Link } from "react-router-dom";

// import {} from "../../public/";

export default function User() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    try {
      dispatch({ type: "budget/setIsLoading", payload: true });
      if (!email || !password) {
        toast.error("Email and password are required");
        return;
      }

      login({ email, password });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="min-h-screen min-w-full bg-center bg-cover bg-no-repeat  bg-[url('../../public/pexels-cottonbro-3943748.jpg')] flex items-center justify-center">
      <form
        className="formLayout flex flex-col items-center justify-center gap-4 bg-cyan-700 p-[8rem]  text-[#FFFFFF] "
        onSubmit={handleSubmit}
      >
        <span>Email:</span>
        <input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // disabled={isLoading}
          className="ml-3 text-black rounded-md"
        />

        <span>Password</span>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // disabled={isLoading}
          className="ml-3 text-black rounded-md"
        />

        <div className="flex p-3">
          <button
            type="submit"
            className="bg-[#FFFFFF] text-cyan-700 mt-3 p-3 rounded-md m-3"
          >
            Log in
          </button>
          <Link
            to="/signup"
            className="bg-[#FFFFFF] text-cyan-700 mt-3 p-3 rounded-md m-3"
          >
            Sign up
          </Link>
        </div>
      </form>
    </section>
  );
}
