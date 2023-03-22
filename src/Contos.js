import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Header from './Header'
import UserContext from './userContext'

const Contos = () => {
  const {user,setRef,hists,setHists,chars} = React.useContext(UserContext)
  const [FullHists,setFH] = useState([])
  const nav = useNavigate()
  useEffect(() => {
    if (hists) {
      fetch('https://api-uvc.onrender.com/').then(Response => Response.json()).then(data => {
      setHists(data)
    })
    }
  },[])

  // useEffect(() => {
  //   console.log('Solos:',Solos)
  // },[Solos])
  // useEffect(() => {
  //   console.log('Series:',Series)
  // },[Series])

  useEffect(() => {
    if (hists) {

      const TempFH = hists[0].concat(hists[1])
      // console.log(TempFH)
      setFH(TempFH)
      console.log(chars)
      // console.log(FullHists)
    }
  },[hists])
  function ChangeReftoHist(item) {
    setRef(item)
    nav('/Hist')
  }
  return (
    <div>
      <Header />
    <div style={{display: 'grid',gridTemplateColumns: 'repeat(auto-fit,300px)',gap: '32px',justifyContent: 'center',padding: '20px'}}>
      {FullHists.length > 0 && FullHists.map((item) => (
        <>
        <div key={item.Ref} onClick={() => {ChangeReftoHist(item)}} className='divhover' style={{width: '300px',height: '600px',backgroundColor: '#161616'}}>
        <img style={{width: '100%',height: '300px'}} src={item.Imgref} />
        <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
        <div style={{display: 'flex',justifyContent: 'space-between',width: '90%',marginTop: '6px '}}>
          <p style={{color: item.Local === 'UNIVERSAL' ? '#4287f5' : '#1f6e1e'}}>{item.Local}</p>
          <p style={{color: item.Tipo === 'SOLO' ? '#fff23d' : '#ff3d43'}}>{item.Tipo}</p>
        </div>
        <h1 style={{fontSize: '30px',marginTop: '10px',textAlign: 'center'}}>{item.Nome}</h1>
          <p style={{textAlign: 'center',maxWidth: '80%'}}>{item.Desc}</p>
        </div>
        </div>
        </>
      ))}
      </div>
    </div>
  )
}

export default Contos