import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Pages/Signup.jsx'
import Signin from "./Pages/Signin.jsx"
import Dashboard from "./Pages/Dashboard.jsx"
import SendMoney from "./Pages/SendMoney.jsx"

export default function App(){
    return(
    <>
        <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/send' element={<SendMoney />} />
        </Routes>
        </BrowserRouter>
    </>
    )
}