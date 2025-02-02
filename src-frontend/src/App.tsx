//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar";
import AboutPage from "./pages/AboutPage";
import ListPage from "./pages/ListPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";

export type ApiResponse = {
  type?: string; // Users keyed by string indices and `success` boolean
  success: boolean;
};

function App() {

  const [sessionCheck, setSessionCheck] = useState<boolean>(false)

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "https://dev.purinnova.online:5172/";
        const response = await fetch(url);
        const data: ApiResponse = await response.json();
  
        if (data.success && data.type === 'session') {
          setSessionCheck(true)
        } else {
          console.error("No session");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData()
  }, [])*/

  return (
    <Box minH={"100vh"}
    bgGradient={"to-b"}
    gradientFrom={{base:"purple.100", _dark:"purple.950"}}
    gradientTo={{base:"purple.300", _dark:"violet"}}
    transitionProperty={"background"} transitionDuration={"fast"}>
     <Navbar sessionCheck={sessionCheck}/>
     <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/list' element={<ListPage />}/>
      <Route path='/list/:param' element={<ListPage />}/>
      <Route path='/register' element={<RegisterPage />}/>
      <Route path='/login' element={<LoginPage />}/>
     </Routes>
    </Box>
  )
}

export default App
