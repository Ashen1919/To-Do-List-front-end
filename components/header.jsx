import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Header() {

    //useState hooks
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState("");

    //useEffect hook
    useEffect(() =>{
        //get the token
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");

        if(token){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/" + email).then((res) =>{
                setName(res.data.user.firstName);
                setIsLoggedIn(true);
            }).catch((err) => {
                console.log(err);
            })
        }else{
            setIsLoggedIn(false);
        }
        
    }, [isLoggedIn])

    //logout function
    function handleLogout(){
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setIsLoggedIn(false);
        toast.success("Logout successfully");
    }

    
    return(
        <div className="w-full h-[70px] bg-gray-800 p-5 items-center flex justify-between">
            <div>
                <Link to={'/'}><h1 className="text-2xl font-bold text-white">To-Do-List</h1></Link>
            </div>
            <div className="max-w-full">
                <Link className="text-white text-xl hover:underline mr-6.5" to={'/'}>Home</Link>
                <Link className="text-white text-xl hover:underline" to={'/list'}>To-Do-List</Link>
            </div>
            {isLoggedIn ? (
                <div className="relative group">
                    <p className="text-white text-xl hover:underline flex cursor-pointer items-center">Welcome {name} <IoIosArrowDown className="ml-2 mt-2"/></p>
                    <div className="absolute right-0 mt-2 flex group-hover:opacity-100 opacity-0 transition-opacity z-50 duration-200">
                        <button onClick={handleLogout} className="p-2.5 w-[90px] bg-gray-600 text-white cursor-pointer">Logout</button>
                    </div>
                </div>
            ) : (
                <div>
                    <Link className="text-white text-xl hover:underline mr-6.5" to={'/login'}>Login</Link>
                    <Link className="text-white text-xl hover:underline" to={'/signup'}>SignUp</Link>
                </div>
            )}
            
        </div>
        
    )
}