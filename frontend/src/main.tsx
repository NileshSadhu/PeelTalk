import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <HelmetProvider>
        <>
            <App />
            <Toaster position="top-right" reverseOrder={false} />
        </>
        </HelmetProvider>
    </BrowserRouter>
);
