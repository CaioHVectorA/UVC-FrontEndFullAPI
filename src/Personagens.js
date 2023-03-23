import React, { useEffect, useState } from 'react'
import Header from './Header'
import UserContext from './userContext'
const Personagens = () => {
  const {user,setRef,hists,setHists,chars,setChars} = React.useContext(UserContext)
  useEffect(() => {
    console.log(chars)
    if (!chars) {
        console.log('aaa')
        fetch('https://api-uvc.onrender.com/Chars').then(Response => Response.json()).then(data => {      
            setChars(data)
            // console.log(data)
        })
    }
  },[])
  return (
    <div>
        <Header />
        <div>
            {chars && <div>
            {chars[0].map((item) => (
                <h1>{item.nome}</h1>
            ))}
            </div>}
        </div>
    </div>
  )
}

export default Personagens