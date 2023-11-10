import React from 'react'
import FectchData from './components/FectchData'
import EditForm from './components/EditForm'

import {BrowserRouter, Route, Routes} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter> 
    <h1>ADMIN APP</h1>
    <div>
      <Routes> 
        <Route path='/' element={<FectchData/>}/> 
        <Route path='/edit/:id' element={<EditForm/>}/> 
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App