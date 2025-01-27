//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar";
import AboutPage from "./pages/AboutPage";
import ListPage from "./pages/ListPage";

function App() {

  return (
    <Box minH={"100vh"}
    bgGradient={"to-b"}
    gradientFrom={{base:"purple.100", _dark:"purple.950"}}
    gradientTo={{base:"purple.300", _dark:"violet"}}
    transitionProperty={"background"} transitionDuration={"fast"}>
     <Navbar />
     <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/list' element={<ListPage />}/>
     </Routes>
    </Box>
  )
}

export default App
