import React, { useEffect, useState } from 'react'
import Header from './Header'
import UserContext from './userContext'
const Personagens = () => {
  const {user,setRef,hists,setHists,chars} = React.useContext(UserContext)
  const [charac,setCharacs] = useState([])
  useEffect(() => {
    if (!chars) {
        console.log('aaa')
        fetch('https://api-uvc.onrender.com/Chars').then(Response => Response.json()).then(data => {      
            setCharacs(data)
        })
    } else {
        console.log(charac,chars)
        setCharacs(chars)
        console.log(charac,chars)
    }
  },[])
  return (
    <div>
        <Header />
        <div>
            {chars && <div>
            {chars.map((item) => (
                <h1>{item.nome}</h1>
            ))}
            </div>}
        </div>
    </div>
  )
}

export default Personagens