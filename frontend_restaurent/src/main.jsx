import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';



const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
createRoot(document.getElementById('root')).render(
  <><BrowserRouter>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}  afterSignOutUrl="/" debug>
   
    <App />
  
    </ClerkProvider> </BrowserRouter>
  </>
);
