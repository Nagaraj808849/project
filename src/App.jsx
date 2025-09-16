import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from '../Login/Login'
import Signup from '../Login/Signup'
import Frontpage from '../Home/Frontpage'
import HomePage1 from '../Home/HomePage1'
import { BrowserRouter as Router,Routes,Route } from 'react-router'

import HomePage2 from '../Home/HomePage2'
// import LandingPage from '../Home/HomePage1'

import PortfolioLanding from '../Home/HomePage3'
import TableOrder from '../TableOrder/TableOrdering.jsx'
import PaymentPage from '../Payment/PaymentDetails.jsx'
import UserDash from '../UserDash/UserDash.jsx'
import Admin from '../AbminDash/Admin.jsx'
// import Dashboard from '../AbminDash/Admin.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
     
   
         
           {/* <Router>
        <Routes>
          <Route path='/' element={<Frontpage/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
         



        </Routes> 
      </Router>  */}
       {/* <HomePage1/>
       <HomePage2/> */}
 {/* <TableOrder/> */}
 {/* <PaymentPage/> */}
 {/* <Dashboard/> */}
 {/* <TableOrder/> */}

          {/* <PortfolioLanding/> */}
          {/* <UserDash/> */}
          <Admin/>
       
   
      
     
      </div>
      
    </>
  )
}

export default App
