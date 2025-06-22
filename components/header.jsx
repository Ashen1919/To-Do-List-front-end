import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiAlignRight } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Header() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    useEffect(() => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");

        if (token) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/" + email)
                .then((res) => {
                    setName(res.data.user.firstName);
                    setIsLoggedIn(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setIsLoggedIn(false);
        toast.success("Logout successfully");
        window.location.reload();
    }

    function toggleMobileMenu() {
        setIsMenuOpen(prev => !prev);
    }

    return (
        <div className="w-full h-[70px] bg-gray-800 relative p-5 items-center flex justify-between">
            <div>
                <Link to={'/'}><h1 className="text-2xl font-bold text-white">To-Do-List</h1></Link>
            </div>

            <div className="max-w-full hidden md:block">
                <Link className="text-white text-xl hover:underline mr-6.5" to={'/'}>Home</Link>
                <Link className="text-white text-xl hover:underline" to={'/list'}>To-Do-List</Link>
            </div>

            {isLoggedIn ? (
                <div className="relative group hidden md:block">
                    <p className="text-white text-xl hover:underline flex cursor-pointer items-center">
                        Welcome {name} <IoIosArrowDown className="ml-2 mt-2" />
                    </p>
                    <div className="absolute right-0 mt-2 flex group-hover:opacity-100 opacity-0 transition-opacity z-50 duration-200">
                        <button onClick={handleLogout} className="p-2.5 w-[90px] bg-gray-600 text-white cursor-pointer">Logout</button>
                    </div>
                </div>
            ) : (
                <div className="hidden md:block">
                    <Link className="text-white text-xl hover:underline mr-6.5" to={'/login'}>Login</Link>
                    <Link className="text-white text-xl hover:underline" to={'/signup'}>SignUp</Link>
                </div>
            )}

            {/* Mobile menu toggle icon */}
            <div className="md:hidden text-white text-3xl cursor-pointer">
                {isMenuOpen ? (
                    <MdClose onClick={toggleMobileMenu} />
                ) : (
                    <FiAlignRight onClick={toggleMobileMenu} />
                )}
            </div>

            {/* Mobile menu content */}
            {isMenuOpen && (
                <div className="absolute font-bold w-1/2 h-[40vh] top-[70px] right-0 backdrop-blur-md rounded-md border border-white/30 shadow-lg z-50 p-4 flex flex-col space-y-4">
                    <Link className="text-white text-lg" to={'/'} onClick={toggleMobileMenu}>Home</Link>
                    <Link className="text-white text-lg" to={'/list'} onClick={toggleMobileMenu}>To-Do-List</Link>
                    {isLoggedIn ? (
                        <button onClick={() => { handleLogout(); toggleMobileMenu(); }} className="text-white text-lg text-left cursor-pointer">Logout</button>
                    ) : (
                        <>
                            <Link className="text-white text-lg" to={'/login'} onClick={toggleMobileMenu}>Login</Link>
                            <Link className="text-white text-lg" to={'/signup'} onClick={toggleMobileMenu}>SignUp</Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
