import { Link } from "react-router-dom";

export default function Header() {
    return(
        <div className="w-full h-[70px] bg-gray-800 p-5 items-center flex justify-between">
            <div>
                <a href="/"><h1 className="text-2xl font-bold text-white">To-Do-List</h1></a>
            </div>
            <div className="max-w-full">
                <Link className="text-white text-xl hover:underline mr-6.5" to={'/'}>Home</Link>
                <Link className="text-white text-xl hover:underline" to={'/list'}>To-Do-List</Link>
            </div>
            <div>
                <Link className="text-white text-xl hover:underline mr-6.5" to={'/login'}>Login</Link>
                <Link className="text-white text-xl hover:underline" to={'/signup'}>SignUp</Link>
            </div>
            
        </div>
        
    )
}