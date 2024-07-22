
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CartProvider } from './consts/CartContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
    <CartProvider>
    <App />
    </CartProvider>
)
