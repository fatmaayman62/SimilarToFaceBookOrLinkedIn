import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {HeroUIProvider} from "@heroui/react";
import UserContextProvider from './Context/UserContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
    <HeroUIProvider>
     <App />
    </HeroUIProvider>
    </UserContextProvider>
  </StrictMode>,
)
