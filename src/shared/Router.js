import React from 'react'
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../pages/Login/Login"
import Signup from "../pages/Signup/Signup"
import Main from "../pages/Main/Main"
import PostPage from "../pages/PostPage/PostPage"
import Dashboard from '../pages/DashBoards/Dashboard';
import BoardContent from '../pages/BoardContent/BoardContent';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/" element={<Main />} />
        <Route path="/:boardType" element={<Dashboard/>} />
        <Route path="/:boardType/:boardId" element={<BoardContent/>} />
        <Route path="postpage" element={<PostPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router