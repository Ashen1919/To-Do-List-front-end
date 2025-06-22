import { Link } from "react-router-dom";

export default function HomeContent() {
    return (
        <div className="w-full min-h-screen flex flex-col md:flex-row bg-gray-900">
            <div className="w-full md:w-1/2 h-full p-6 flex flex-col justify-center lg:mt-[10rem] items-start text-center md:text-left">
                <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono mb-6">
                    Keep track of tasks and stay organized every day.
                </h1>
                <Link to="/list">
                    <button className="bg-blue-700 cursor-pointer text-white font-semibold px-6 py-4 rounded-lg border-2 border-blue-700 hover:bg-blue-800 transition duration-300 text-lg sm:text-xl">
                        Get Started
                    </button>
                </Link>
            </div>

            <div className="w-full md:w-1/2 h-[300px] md:h-auto">
                <img
                    src="../public/to-do.png"
                    alt="to-do-image"
                    className="w-full h-full object-fill"
                />
            </div>
        </div>
    );
}
