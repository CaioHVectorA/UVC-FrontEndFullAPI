import logo from './logo.svg';
import './App.css';
import { useContext, useEffect, useState } from 'react';
import UserContext from './userContext';
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import football from './img/football-game.png'

function Home() {
    const {user, setUser,hists,setHists,chars,setChars} = useContext(UserContext)
  const [data,setData] = useState(null)
  const [confirmed,setConfirmed] = useState(null)
  const [loged,setLoged] = useState(null)
  const [UserName,setUserName] = useState('')
  const [Password,setPass] = useState('')
  const [error,setError] = useState('')
  const [modeRegistrar,setMode] = useState(true)
  const nav = useNavigate()

  useEffect(() => {
    fetch('https://api-uvc.onrender.com/').then(Response => Response.json()).then(data => {
      const TSolos = data[0]
      const TSeries = data[1]
      setHists([TSolos,TSeries])
    })
  },[])
  useEffect(() => {
    fetch('https://api-uvc.onrender.com/Chars').then(Response => Response.json()).then(data => {
      console.log('data:',data)
      setChars(data)
    })
  },[])
  function HandleSubmit() {
    setError('')
    setUser(UserName)
    console.log(modeRegistrar)
    if (modeRegistrar) {
      console.log('teste')
        Axios.post('https://online-uvc.onrender.com/Person',{
          UserName: UserName,
          Password: Password
        }).then((Response) => {
          console.log(Response)
          if (Response.status === 201) {
            nav('/Contos')
          } else {setError(Response.data.error)}
        })
      } else {
        let data;
        Axios.get('https://online-uvc.onrender.com/Person').then(Response => {
          console.log(Response.data); data = Response.data
          console.log(data)
          data.forEach(item => {
            console.log(item.UserName === UserName)
            if (item.UserName === UserName) {
              if (item.Password === Password) {
                nav('/Contos')
            } else {
              setError('Senha Incorreta')
            }
          } else if (error === '') {
           setError('Usuário Inexistente')
          }
        })
        })
    }
  }
  return (
    <div onKeyPress={(e) => {if (e.key === 'Enter') HandleSubmit()}} className="App" style={{alignContent: 'center',justifyContent: 'center',width: '100vw',height: '100vh'}}>
      { !confirmed && <div>
        <h1>Atenção</h1>
        <p>Não utilize de dados reais ou confidenciais.</p>
        <button onClick={() => setConfirmed(true)} style={{fontSize: '40px',padding: '6px 32px',marginTop: '32px',borderRadius: '12px'}}>Continuar</button>
      </div>
      }
      {confirmed && !loged && <div style={{display: 'grid',gridTemplateRows: '1fr 1fr',gap: '32px',justifyContent: 'center'}}>
        <div style={{display: 'flex',flexDirection: 'column',flex: 1,width: '320px',gap: '2px'}}>
        <label>Nome de Usuário</label>
        <input style={{padding: '6px 20px',border: '1px solid white',borderRadius: '8px',fontSize: '20px'}} onChange={(e) => setUserName  (e.target.value)} value={UserName} placeholder={''}></input>
        </div>
        <div style={{display: 'flex',flexDirection: 'column',flex: 1,width: '320px',gap: '2px'}}>
        <label>Senha</label>
        <input type={'password'} style={{padding: '6px 20px',border: '1px solid white',borderRadius: '8px',fontSize: '20px'}} onChange={(e) => setPass(e.target.value)} value={Password} placeholder={''}></input>
        </div>
        <h3 style={{color: '#ff192b'}}>{error}</h3>
        <button onClick={HandleSubmit} style={{fontSize: '32px',borderRadius: '25px'}}>{modeRegistrar ? 'Registrar' : 'Login'}</button>
        <a onClick={() => setMode(!modeRegistrar)} style={{fontSize: '20px',borderRadius: '25px'}}>Já tenho uma Conta</a>
        </div>}
    </div>
  );
}

export default Home;
