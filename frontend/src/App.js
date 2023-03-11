import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Admin from './Component/Admin'
import Signin from './Component/Signin'
import Signup from './Component/Signup'
import User from './Component/User'
import UserEdit from './Component/UserEdit'
import Useritem from './Component/Useritem'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exect path='/' element={<Signup/>}/>
          <Route  path='/signin' element={<Signin/>}/>
          <Route  path='/admin' element={<Admin/>}/>
          <Route  path='/user/:username' element={<User/>}/>
          <Route  path='/useritem/:username/:id' element={<Useritem/>}/>
          <Route  path='/useredit/:username/:id' element={<UserEdit/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App

