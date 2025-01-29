//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from "@chakra-ui/react"
import { BrowserRouter } from 'react-router-dom'
import { ColorModeProvider } from './components/ui/color-mode.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider>
          <App />
        </ColorModeProvider>
      </ChakraProvider>
    </BrowserRouter>
)
