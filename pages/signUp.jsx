import Header from "../components/header";
import { Link } from "react-router-dom";

export default function SignUp() {
    return(
        <>
        <Header/>
        <div className="w-full h-[90vh] bg-gray-900 flex flex-col items-center text-white justify-center">
            <h1 className=" font-bold text-5xl mb-5">SignUp</h1>
            <div className="w-[30rem] h-auto border-2 backdrop-blur-4xl rounded-xl bg-white/5 border-gray-700 p-6">
                <div className="w-full flex flex-col mb-5">
                    <label className="text-xl mb-3" htmlFor="email">Email:</label>
                    <input className="p-2 border-2 rounded-lg border-gray-600 outline-0" autoComplete="off" type="email" name="new_email" id="email" />
                </div>
                <div className="w-full flex flex-col mb-5">
                    <label className="text-xl mb-3" htmlFor="first_name">First Name:</label>
                    <input className="p-2 border-2 rounded-lg border-gray-600 outline-0" autoComplete="off" type="text" name="new_first_name" id="first_name" />
                </div>
                <div className="w-full flex flex-col mb-5">
                    <label className="text-xl mb-3" htmlFor="last_name">Last Name:</label>
                    <input className="p-2 border-2 rounded-lg border-gray-600 outline-0" autoComplete="off" type="text" name="new_last_name" id="last_name" />
                </div>
                <div className="w-full flex flex-col mb-2">
                    <label className="text-xl mb-3" htmlFor="password">Password:</label>
                    <input className="p-2 border-2 rounded-lg border-gray-600 outline-0" autoComplete="off" type="password" name="new_password" id="password" />
                </div>
                <div className="flex justify-center mt-3 mb-3">
                    <button className="p-2.5 text-lg rounded-xl cursor-pointer w-full bg-blue-700 border-2 border-blue-700 hover:bg-blue-600 hover:border-blue-600 transition duration-500">Login</button>
                </div>
                <p className="flex justify-center">Already have an account? <span><Link className="cursor-pointer hover:underline" to={'/login'}>Login</Link></span></p>
            </div>
        </div>
        </>
    )
}