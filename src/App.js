import React, { useState } from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Contos from './Contos'
import Hist from './Hist'

import Home from './Home'
import Personagens from './Personagens'
import UserContext from './userContext'
const App = () => {
  const [user,setUser] = useState('')
  const [ref,setRef] = useState(null)
  const [chars,setChars] = useState(null)
  const [hists,setHists] = useState(null)
  return (
    <BrowserRouter>
    <UserContext.Provider value={{user,setUser,ref,setRef,chars,setChars,hists,setHists}}>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Contos' element={<Contos />} />
      <Route path='/Hist' element={<Hist />} />
      <Route path='/Personagens' element={<Personagens />} />
    </Routes>
    </UserContext.Provider>
  </BrowserRouter>
  )
}

export default App