//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Box, Text } from "@chakra-ui/react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar";
import AboutPage from "./pages/AboutPage";
import ListPage from "./pages/ListPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { createContext, ReactNode, useEffect, useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import Loader from "./components/Loader";
import ButtonlessPopup from "./components/buttonlessPopup";

export type ApiResponse = {
  type?: string;
  success: boolean;
  username?: string;
  message?: string;
};

interface PageProps {
  title?: string;
  children: ReactNode;
}

const Page: React.FC<PageProps> = (props) => {
  useEffect(() => {
    document.title = props.title || "";
  }, [props.title]);
  return props.children;
};

interface ErrorContext {
  errorStatus: string;
  setErrorStatus: React.Dispatch<React.SetStateAction<string>>;
  sessionCheck: boolean;
  username: string;
}

export const PanelContext = createContext<ErrorContext>({
  errorStatus: "",
  setErrorStatus: () => {},
  sessionCheck: false,
  username: ""
})

const App = () => {
  const location = useLocation()
  const [sessionCheck, setSessionCheck] = useState(false)
  const [loading, setLoading] = useState(true)
  const [errorStatus, setErrorStatus] = useState("")
  const [username, setUsername] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
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
      } finally {
        setLoading(false)
      }
    };
    fetchData()
  }, [location])

  if (loading) {
    return <Loader />; // Display the loader while loading is true
  }
  

  return (
    <Box minH={"100vh"}
    bgGradient={"to-b"}
    gradientFrom={{base:"purple.100", _dark:"purple.950"}}
    gradientTo={{base:"purple.300", _dark:"purple.800"}}
    transitionProperty={"background"} transitionDuration={"fast"}>
    
    <ButtonlessPopup dialogTitle={"Message"} dialogButtonText='Ok' openProp={errorStatus !== ""} onClickFunc={() => setErrorStatus("")}>
            <Text>{errorStatus}</Text>
      </ButtonlessPopup>
     <PanelContext.Provider value={{errorStatus, setErrorStatus, sessionCheck, username}}>
       <Navbar/>
       <Routes>
        <Route path='/' element={
          <Page title="Home">
          <HomePage />
          </Page>} />
        <Route path='/about' element={
          <Page title="About">
            <AboutPage />
          </Page>
        } />
        <Route path='/list' element={
          <Page title="Enrolled Students">
            <ListPage />
          </Page>
        }/>
        <Route path='/list/:param' element={
          <Page title="Enrolled Students">
            <ListPage />
          </Page>
        }/>
        <Route path='/register' element={
          <Page title="Register">
            <RegisterPage />
          </Page>
        }/>
        <Route path='/login' element={
          <Page title="Login">
            <LoginPage />
          </Page>
        }/>
        <Route path='/dashboard' element={
          <Page title="Dashboard">
            <DashboardPage/>
          </Page>
        }/>
       </Routes>
     </PanelContext.Provider>
    </Box>
  )
}

export default App
