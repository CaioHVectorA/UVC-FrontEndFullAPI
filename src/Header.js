import React, { useState } from 'react'
import UVC from './img/UVC.png'
import people from './img/user.png'
import UserContext from './userContext'
import { NavLink, useNavigate } from 'react-router-dom'
const Header = () => {
    const {user} = React.useContext(UserContext)
    const nav = useNavigate()
    const [ativado, setAtivado] = useState(false)
  return (
    <div>
      {window.innerWidth > 480 &&
        <header style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',background: '#B140A6',height: '100px',marginBottom: '32px'}}> 
        <img onClick={() => nav('/Contos')} className='divhover' style={{height: '200px',position: 'relative',top: '16px',left: '20px'}} src={UVC} />
        <div style={{display: "flex",position:  'relative',right: '32px',padding: '6px',borderRadius: '25px',flex: '0',alignItems: 'center',gap: '8px',border: '2px solid rgba(0,0,0,.4)'}}>
            <img src={people} style={{width: '32px',height: '32px'}}/>
            <h1 style={{position: 'relative',bottom: '4px',whiteSpace: 'nowrap',fontSize: '16px',fontWeight: 'normal'}}>{user}</h1>
        </div>
        </header>}
        {window.innerWidth < 480 &&
        <header style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',background: '#B140A6',height: '100px',marginBottom: '32px',paddingRight: '24px'}}> 
        <img onClick={() => nav('/Contos')} className='divhover' style={{height: '200px',position: 'relative',top: '16px',left: '20px'}} src={UVC} />
        <svg onClick={() => setAtivado(!ativado)} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>
        {ativado && <div style={{width: '100%',color: 'black',display: 'flex',flexDirection: 'column',gap: '12px',height: '100vh',backgroundColor: '#ad26ab',position: 'absolute',top: '100px',animation: 'Menu 600ms',right: '0px'}}>
          <p style={{fontSize: '34px',marginTop: '16px',textAlign: 'center'}}>{user}</p>
          <div style={{marginLeft: '16px',width: '100%'}}>
            <NavLink style={{textDecoration: 'none',color: 'black'}} to={'/Personagens'}><h1>Personagens</h1></NavLink>
            <div style={{height: '2px',width: '80%',backgroundColor: 'rgba(0,0,0,.6)',borderRadius: '25px'}}></div>
          </div>
          <div style={{marginLeft: '16px',width: '100%'}}>
            <NavLink style={{textDecoration: 'none',color: 'black'}} to={'/Contos'}><h1>Contos</h1></NavLink>
            <div style={{height: '2px',width: '80%',backgroundColor: 'rgba(0,0,0,.6)',borderRadius: '25px'}}></div>
          </div>
          <div style={{marginLeft: '16px',width: '100%'}}>
            <NavLink style={{textDecoration: 'none',color: 'black'}} to={'/Home'}><h1>Logout</h1></NavLink>
            {/* <h1>Logout</h1> */}
            <div style={{height: '2px',width: '80%',backgroundColor: 'rgba(0,0,0,.6)',borderRadius: '25px'}}></div>
          </div>
          </div>}
        </header>
        }
    </div>
  )
}

export default Header