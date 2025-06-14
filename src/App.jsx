import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "../pages/homePage"
import Login from "../pages/login"
import SignUp from "../pages/signUp"
import ListPage from "../pages/listPage"

function App() {

  return (
    <BrowserRouter>
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
