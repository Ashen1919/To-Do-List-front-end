import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "../pages/homePage"
import Login from "../pages/login"
import SignUp from "../pages/signUp"
import ListPage from "../pages/listPage"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false}/>
      <Routes path="/*">
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/list" element={<ListPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
