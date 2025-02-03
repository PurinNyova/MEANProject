//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Box } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar";
import AboutPage from "./pages/AboutPage";
import ListPage from "./pages/ListPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";
import DashboardPage from "./pages/DashboardPage";

export type ApiResponse = {
  type?: string; // Users keyed by string indices and `success` boolean
  success: boolean;
  username?: string;
};

function App() {

  const location = useLocation()
  const [username, setUsername] = useState("")
  const [sessionCheck, setSessionCheck] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = import.meta.env.VITE_PROXY+"login";
        const response = await fetch(url, {credentials: 'include'});
        const data: ApiResponse = await response.json();
        console.log(data.success, data.type)
  
        if (data.success && data.type === 'session' && data.username) {
          setSessionCheck(true)
          setUsername(data.username)
        } else {
          console.error("No session");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData()
  }, [location])

  return (
    <Box minH={"100vh"}
    bgGradient={"to-b"}
    gradientFrom={{base:"purple.100", _dark:"purple.950"}}
    gradientTo={{base:"purple.300", _dark:"purple.800"}}
    transitionProperty={"background"} transitionDuration={"fast"}>
     <Navbar sessionCheck={sessionCheck}/>
     <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/list' element={<ListPage />}/>
      <Route path='/list/:param' element={<ListPage />}/>
      <Route path='/register' element={<RegisterPage />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/dashboard' element={<DashboardPage loginState={sessionCheck} username={username}/>}/>
     </Routes>
    </Box>
  )
}

export default App
