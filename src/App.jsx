import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from '../Login/Login'
import Signup from '../Login/Signup'
import Frontpage from '../Home/Frontpage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import TableOrder from '../TableOrder/TableOrdering.jsx'
import PaymentPage from '../Payment/PaymentDetails.jsx'
import ScientificCalculator from '../UserDash/UserDash.jsx'
import Admin from '../AbminDash/Admin.jsx'
import Homepage1 from '../Home/HomePage1.jsx'
// import Homepage2 from '../Home/HomePage2.jsx'
import Menu1 from '../Menu/Menu1.jsx'
import CartPage from '../Menu/Cartpage.jsx' 

// import Dashboard from '../Dashboard/Dashboard.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>


   <Router>
          <Routes>
            <Route path='/' element={<Frontpage />} />
            <Route path='/Homepage1' element={<Homepage1 />} />
            <Route path='/Menu1' element={<Menu1 />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path='/TableOrder' element={<TableOrder />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/Table' element={<TableOrder />} />
            <Route path='/PaymentDetails' element={<PaymentPage />} />
            <Route path='/Admin' element={<Admin />} />



          </Routes>
        </Router>    
        {/* <PaymentPage/> */}


        {/* <Homepage2/> */}

        {/* <ScientificCalculator/> */}
        {/* <Admin/>  */}
        {/* <Login/> */}
        {/* <AdminSignup/> */}
         {/* <Menu1/> */}
      </div>

    </>
  )
}

export default App
