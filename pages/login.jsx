import { FcGoogle } from "react-icons/fc";
import Header from "../components/header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  //Hooks config
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleLogging() {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", email);
        setIsLoading(true);
        toast.success("Login successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  }

  return (
    <>
      <Header />
      <div className="w-full h-[90vh] bg-gray-900 flex flex-col items-center text-white justify-center">
        <h1 className=" font-bold text-5xl mb-5">Login</h1>
        <div className="w-[25rem] md:w-[30rem] h-auto border-2 backdrop-blur-4xl rounded-xl bg-white/5 border-gray-700 p-6">
          <div className="w-full flex flex-col mb-5">
            <label className="text-xl mb-3" htmlFor="email">
              Email:
            </label>
            <input
              className="p-2 border-2 rounded-lg border-gray-600 outline-0"
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={email}
              autoComplete="off"
              type="email"
              name="new_email"
              id="email"
            />
          </div>
          <div className="w-full flex flex-col mb-2">
            <label className="text-xl mb-3" htmlFor="password">
              Password:
            </label>
            <input
              className="p-2 border-2 rounded-lg border-gray-600 outline-0"
              onChange={(e) => setPassword(e.target.value)}
              defaultValue={password}
              autoComplete="off"
              type="password"
              name="new_password"
              id="password"
            />
          </div>
          <Link className="cursor-pointer hover:underline" to={"/"}>
            Forgot password?
          </Link>
          <div className="flex justify-center mt-3 mb-3">
            <button
              disabled={isLoading}
              onClick={handleLogging}
              className="p-2.5 text-lg rounded-xl cursor-pointer w-full bg-blue-700 border-2 border-blue-700 hover:bg-blue-600 hover:border-blue-600 transition duration-500"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="border-white border-t-2 w-[20px] h-[20px] rounded-full animate-spin"></div>
                </div>
              ) : (
                <span>Login</span>
              )}
              
            </button>
          </div>
          <div className="flex justify-center mb-3">
            <p>Or</p>
          </div>
          <div className="w-full mb-3">
            <button className="flex items-center justify-center p-2.5 w-full rounded-xl bg-gray-700 hover:bg-transparent duration-500 border-2  border-gray-600 cursor-pointer">
              <FcGoogle className="text-2xl mr-3" />
              <p className="font-semibold text-xl">Login with Google</p>
            </button>
          </div>
          <p className="flex justify-center">
            Don't have an account?{" "}
            <span>
              <Link className="cursor-pointer hover:underline" to={"/signup"}>
                SignUp
              </Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
