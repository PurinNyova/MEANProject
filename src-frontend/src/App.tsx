//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Button, Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar";
import AboutPage from "./pages/AboutPage";

function App() {

  return (
    <Box minH={"100vh"} bg={{base:"purple.200", _dark:"purple.950"}} transition={"backgrounds"} transitionDuration={"fast"}>
     <Navbar />
     <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
     </Routes>
    </Box>
  )
}

export default App
