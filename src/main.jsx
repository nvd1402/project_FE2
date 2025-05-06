import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AdminAuthProvider } from './components/context/AdminAuth.jsx';
import { CartProvider } from './components/context/Cart1.jsx';
import { AuthProvider } from './components/context/Auth.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminAuthProvider>
      <AuthProvider>
      <CartProvider>
      <App />
      </CartProvider>
      </AuthProvider>
    </AdminAuthProvider>
   
  </StrictMode>,
)
