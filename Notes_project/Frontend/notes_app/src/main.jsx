import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import AuthcontextProvider from './context/AuthcontextProvider.jsx'

createRoot(document.getElementById('root')).render(
    <AuthcontextProvider>
        <App />
    </AuthcontextProvider>
)
