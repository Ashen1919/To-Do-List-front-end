import { Link } from "react-router-dom";
import Header from "../components/header";

export default function ListPage() {
    return(
        <>
        <Header/>
        <div className="w-full h-[90vh] flex text-white bg-gray-900">
            <div className="w-[40%] h-[90vh] overflow-hidden p-5 border-r-4 border-gray-700">
                <h1 className="text-2xl font-semibold flex justify-center mb-3">Create a Note here</h1>
                <div className="w-full flex flex-col mb-5">
                    <label className="text-xl mb-3" htmlFor="title">Title:</label>
                    <input className="p-2 border-2 rounded-lg border-gray-600 outline-0" autoComplete="off" type="text" name="new_title" id="title" />
                </div>
                <div className="w-full flex flex-col mb-5">
                    <label className="text-xl mb-3" htmlFor="title">Description:</label>
                    <textarea className="p-2 border-2 rounded-lg border-gray-600 outline-0" name="description" id="description"></textarea>
                </div>
                <button className="p-2.5 text-lg rounded-xl cursor-pointer w-full bg-blue-700 border-2 border-blue-700 hover:bg-blue-600 hover:border-blue-600 transition duration-500">Create</button>
            </div>
            <div className="w-[60%] h-auto overflow-auto p-5">
                <div className="w-full flex flex-col items-center mb-5">
                    <p className="text-2xl font-bold mb-5">SignUp to create lists</p>
                    <Link to={'/signup'} className="w-[10rem] p-2 text-lg bg-blue-600 rounded-lg hover:bg-blue-800 duration-500 flex justify-center">Sign Up</Link>
                </div>
                <div className="w-full h-[16rem] border-2 border-gray-700 rounded-xl p-2 mb-3 relative">
                    <div className="w-full flex justify-between mb-2">
                        <p>Date: 2025/06/15</p>
                        <p>Time: 14:30:22</p>
                    </div>
                    <p className="font-bold text-blue-400 mb-2">Title: <span className="font-normal text-white">Go a trip</span></p>
                    <div className="w-full flex mb-3">
                        <p className="font-bold text-blue-400 mb-2">Description:</p>
                        <p className="ml-2 w-full h-[5rem] overflow-auto"></p>
                    </div>
                    <p className="mb-2 text-blue-400 font-bold">Status: <span className="text-white font-normal">Not-Completed</span></p>
                    <div className="w-full flex justify-end">
                        <button className="p-2 right-2 mr-3 cursor-pointer border-2 border-blue-600 hover:bg-blue-800 duration-500 rounded-lg bg-blue-600">Mark As Done</button>
                        <button className="p-2 right-2 mr-3 cursor-pointer border-2 border-green-600 hover:bg-green-800 duration-500 rounded-lg bg-green-600">Update</button>
                        <button className="p-2 right-2 cursor-pointer border-2 border-red-600 hover:bg-red-800 duration-500 rounded-lg bg-red-600">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}