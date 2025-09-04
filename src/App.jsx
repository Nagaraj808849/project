import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from '../Login/Login'
import Signup from '../Login/Signup'
import Frontpage from '../Home/Frontpage'
import HomePage2 from '../Home/HomePage2'
import { BrowserRouter as Router,Routes,Route } from 'react-router'
import Menu1 from '../Menu/Menu1'

// import HomePage2 from '../Home/HomePage2'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
     
       {/* <HomePage2/> */}
         
          {/* <Router>
        <Routes>
          <Route path='/' element={<Frontpage/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
         



        </Routes> */}
      {/* </Router> */}
      <Menu1/>
      {/* <Signup/>
      <Menu1/> */}
   
      
     
      </div>
      
    </>
  )
}

export default App
