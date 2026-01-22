import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from '../Login/Login'
import Signup from '../Login/Signup'
import Frontpage from '../Home/Frontpage'
import { BrowserRouter as Router,Routes,Route } from 'react-router'


import TableOrder from '../TableOrder/TableOrdering.jsx'
// import PaymentPage from '../Payment/PaymentDetails.jsx'
import ScientificCalculator from '../UserDash/UserDash.jsx'
// import Admin from '../AbminDash/Admin.jsx'
import Menu1 from '../Menu/Menu1.jsx'
import Restaurant from '../Menu/Cartpage.jsx'
import Homepage1 from '../Home/HomePage1.jsx'
// import Dashboard from '../Dashboard/Dashboard.jsx'
 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
   
         
            <Router>
        <Routes>
          <Route path='/' element={<Frontpage/>}/>
          <Route path='/Homepage1' element={<Homepage1/>}/>
          <Route path='/TableOrder' element={<TableOrder/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
            <Route path='/Table' element={<TableOrder/>}/>

         



        </Routes> 
      </Router>  
     

        
   
      
     
      </div>
      
    </>
  )
}

export default App
