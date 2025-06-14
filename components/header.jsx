import { Link } from "react-router-dom";

export default function Header() {
    return(
        <div className="w-full h-[70px] bg-blue-600 p-5 items-center">
            <div>
                <a href="/"><h1 className="text-2xl font-bold text-white">To-Do-List</h1></a>
            </div>
            <div>
                <Link to={'/'}>Home</Link>
                <Link to={'/list'}>To-Do-List</Link>
            </div>
            
        </div>
        
    )
}