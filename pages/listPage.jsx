import { Link } from "react-router-dom";
import Header from "../components/header";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ListPage() {

    //useState hooks
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedNoteID, setSelectedNoteID] = useState("");
    const [isnotesLoading, setIsNotesLoading] = useState(false);
    const [notes, setNotes] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const notesInfo = {title, description, email}
    const updateInfo = {title, description}

    //check user logged-in
    useEffect(() => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");

        if(token){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/notes/" + email, {
                headers: {
                    Authorization : "Bearer " + token,
                    "Content-Type" : "application/json"
                }
            }).then((res) => {
            setNotes(res.data.notes);
            setIsNotesLoading(true);
            setIsLoggedIn(true);

        }).catch((err) => {
            console.log(err);
        })
            
        } else{
            setIsLoggedIn(false);
            setIsNotesLoading(false);
        }
    }, [])


    //notes creation function
    function handleNoteCreation() {
        const token = localStorage.getItem("token");
        if(token){
            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/notes/", notesInfo, {
                headers: {
                    Authorization : "Bearer " + token,
                    "Content-Type" : "application/json"
                }
                }).then((res) => {
                    setIsNotesLoading(true);
                    toast.success("notes creation successfully");
                    window.location.reload();
                }).catch((err) => {
                    console.log(err);
                    toast.error("Something went wrong");
                })
        }else{
            toast.error("Login first to create notes");
        }      
    }

    //notes delete function
    function deleteNotes(noteID) {
        if(window.confirm("Are you sure? Do you want to delete this note?")){
            return axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/notes/" + noteID, {
                headers : {
                    Authorization : "Bearer " + token,
                    "Content-Type" : "application/json"
                }
            }).then((res) => {
                toast.success("Successfully delete the note");
                window.location.reload();
            }).catch((err) =>{
                console.log(err);
                toast.error("Something went wrong");
            })
        }
    }

    //notes update button visible function
    function updateNotesButtonVisible(noteID) {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/notes/byNoteID/" + noteID, {
                headers : {
                    Authorization : "Bearer " + token,
                    "Content-Type" : "application/json"
                }
            }).then((res) => {
                setTitle(res.data.notes.title);
                setDescription(res.data.notes.description);
                setSelectedNoteID(res.data.notes.noteID);
                setIsVisible(true);
            }).catch((err) =>{
                console.log(err);
                toast.error("Something went wrong");
        })
    }

    //notes update function
    function updateNotes() {
        axios.put(import.meta.env.VITE_BACKEND_URL + "/api/notes/" + selectedNoteID, updateInfo, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type" : "application/json"
            }
        }).then((res) => {
            window.location.reload();
            toast.success("Note Updated successfully");
        }).catch((err) => {
            console.log(err);
            toast.error("Something went wrong");
        })
    }

    //notes status update
    function updateStatus(noteID, currentStatus) {
        axios.put(import.meta.env.VITE_BACKEND_URL + "/api/notes/" + noteID, {completed: !currentStatus}, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type" : "application/json"
            }
        }).then(() => {
            window.location.reload();
            toast.success("Note Updated successfully");
        }).catch((err) => {
            console.log(err);
            toast.error("Something went wrong");
        })
        
    }

    return(
        <>
        <Header/>
        <div className="w-full h-auto lg:h-[90vh] flex-row lg:flex text-white bg-gray-900">
            <div className="w-full lg:w-[40%] h-auto lg:h-[90vh] overflow-hidden p-5 lg:border-r-4 border-gray-700">
                <h1 className="text-2xl font-semibold flex justify-center mb-3">Create a Note here</h1>
                <div className="w-full flex flex-col mb-5">
                    <label className="text-xl mb-3" htmlFor="title">Title:</label>
                    <input type="text" name="ID" id="" className="hidden" defaultValue={selectedNoteID} onChange={(e) => setSelectedNoteID(e.target.value)} />
                    <input defaultValue={title} onChange={(e) => setTitle(e.target.value)} className="p-2 border-2 rounded-lg border-gray-600 outline-0" autoComplete="off" type="text" name="new_title" id="title" />
                </div>
                <div className="w-full flex flex-col mb-5">
                    <label className="text-xl mb-3" htmlFor="title">Description:</label>
                    <textarea defaultValue={description} onChange={(e) => setDescription(e.target.value)} className="p-2 border-2 rounded-lg border-gray-600 outline-0" name="description" id="description"></textarea>
                </div>
                {isVisible ? (
                    <button onClick={updateNotes} className="p-2.5 text-lg rounded-xl cursor-pointer w-full bg-green-700 border-2 border-green-700 hover:bg-green-600 hover:border-green-600 transition duration-500">Update Note</button>
                ) : (
                    <button onClick={handleNoteCreation} className="p-2.5 text-lg rounded-xl cursor-pointer w-full bg-blue-700 border-2 border-blue-700 hover:bg-blue-600 hover:border-blue-600 transition duration-500">Create Note</button>
                )}
            </div>
            <div className="w-full lg:w-[60%] h-auto lg:overflow-auto p-5">
                {isLoggedIn ? (
                    isnotesLoading ? (
                        notes.length > 0 ? (
                            notes.slice().reverse().map((Note) => (
                            <div key={Note.noteID} className="w-full h-[16rem] border-2 border-gray-700 rounded-xl p-2 mb-3 relative">
                                <div className="w-full flex justify-between mb-2">
                                    <p>Created Date: {Note.dateString}</p>
                                    <p>Created Time: {Note.timeString}</p>
                                </div>
                                <p className="font-bold text-blue-400 mb-2">Title: <span className="font-normal text-white">{Note.title}</span></p>
                                <div className="w-full flex mb-3">
                                    <p className="font-bold text-blue-400 mb-2">Description:</p>
                                    <p className="ml-2 w-full h-[5rem] overflow-auto">{Note.description}</p>
                                </div>
                                <p className="mb-2 text-blue-400 font-bold">Status: <span className="text-white font-normal">{Note.completed ? <span className="text-red-600">Completed</span>: "Not-completed"}</span></p>
                                <div className="w-full flex justify-end">
                                    <button onClick={() => updateStatus(Note.noteID, Note.completed)} className="p-2 right-2 mr-3 cursor-pointer border-2 border-blue-600 hover:bg-blue-800 duration-500 rounded-lg bg-blue-600">Mark As Done</button>
                                    <button onClick={() => updateNotesButtonVisible(Note.noteID)} className="p-2 right-2 mr-3 cursor-pointer border-2 border-green-600 hover:bg-green-800 duration-500 rounded-lg bg-green-600">Update</button>
                                    <button onClick={() => deleteNotes(Note.noteID)} className="p-2 right-2 cursor-pointer border-2 border-red-600 hover:bg-red-800 duration-500 rounded-lg bg-red-600">Delete</button>
                                </div>
                            </div>
                        ))
                        ) : (
                            <p className="mt-3 flex justify-center text-2xl font-semibold italic">No Notes to show.</p>
                        )
                    ): (
                        <p className="mt-3 flex justify-center text-xl font-semibold">Loading Notes......</p>
                    )
                    
                ) : (
                    <div className="w-full flex flex-col items-center mb-5">
                        <p className="text-2xl font-bold mb-5">SignUp to create lists</p>
                        <Link to={'/signup'} className="w-[10rem] p-2 text-lg bg-blue-600 rounded-lg hover:bg-blue-800 duration-500 flex justify-center">Sign Up</Link>
                    </div>
                )}
                
            </div>
        </div>
        </>
    )
}