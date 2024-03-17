import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import Home from './screens/Home'
import AddEmployee from './screens/AddEmployee'
import EditEmployee from './screens/EditEmployee'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/'  element={ <LoginScreen/> }/>
        <Route path='/home'  element={ <Home/> }/>
        <Route path='/add'  element={ <AddEmployee/> }/>
        <Route path='/edit/:id'  element={ <EditEmployee/> }/>
      </Routes>
    </>
  )
}

export default App