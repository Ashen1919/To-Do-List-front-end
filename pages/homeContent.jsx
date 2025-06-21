import { Link } from "react-router-dom";

export default function HomeContent() {
    return(
        <div className="w-full h-[90vh] flex bg-gray-900">
            <div className="w-[50%] h-full p-5 relative">
                <h1 className="text-white font-extrabold text-7xl absolute bottom-[18rem] font-mono text-left">Keep track of tasks and stay organized every day.</h1>
                <Link to={'/list'}><button className="absolute bottom-[10rem] bg-blue-700 text-white font-semibold p-5 rounded-lg cursor-pointer border-2 border-blue-700 hover:bg-blue-800 transition duration-500 text-xl">Get Started</button></Link>
            </div>
            <div className="w-[50%] h-full">
                <img src="../public/to-do.png" alt="to-do-image" className="w-full h-full bg-cover object-fill" />
            </div>
        </div>
    )
}