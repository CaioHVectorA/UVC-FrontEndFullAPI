import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Header from './Header'
import UserContext from './userContext'
const Division = () => {
    return (
        <div style={{width: '100%',backgroundColor: 'rgba(255,255,255,.4)',height: '2px',borderRadius: '20px',margin: '12px auto'}}></div>
    )
}

const Hist = () => {
    const {ref,user} = useContext(UserContext)
    const [coments,setComents] = useState([])
    const [text,setText] = useState('')
    const [change,setChanged] = useState(false)
    useEffect(() => {
        fetch('https://online-uvc.onrender.com/Comentary').then(Response => Response.json()).then(data => filterData(data))
    },[change])
    function filterData(data) {
        const filtrada = data.filter(item => item.Ref === ref.Ref)
        console.log(data) 
        setComents(filtrada)
    }
    function SubmitComent() {
        axios.post('https://online-uvc.onrender.com/Comentary',{
            ComentID: 2000,
            Name: user,
            Text: text,
            Data: "dasdadasda", 
            isReply: false,
            Replyfor: -1,
            Ref: ref.Ref
        }).then(Response => {
            console.log(Response)
            if (Response.status === 201) {
                alert('Comentário enviado')
                setText('')
                setChanged(!change)
            }
        })
    }
  return (
    <div>
        <Header />
        <main>
        {ref && <div style={{display: 'grid',gridTemplateColumns: '1.5fr 1.5fr',padding: '16px 128px',width: 'calc(100vw - 256px)'}}>
            <img src={ref.Imgref} style={{borderRadius: '12px',width: '70%'}}/>
            <div style={{display: 'flex',flexDirection: 'column'}}>
                <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                <h1>{ref.Nome}</h1>
                <p style={{marginTop: '16px',textAlign: 'center'}}>{ref.Desc}</p>
                <ul style={{display: 'flex',gap: '12px',marginTop: '20px'}}>
                    {ref.Tags.map((item) => (
                        <li style={{listStyle: 'none',fontSize: '22px',backgroundColor: '#B140A6',padding: '5px 10px',borderRadius: '90px'}}>{item}</li>
                    ))}
                </ul>
                </div>
                <Division />
                <div style={{marginTop: '8px'}}>
                <p style={{fontSize: '32px'}}>Status: <span style={{color: ref.Status == 'Completo' ? 'green' : 'darkred'}}>{ref.Status}</span></p>
                <p style={{fontSize: '32px'}}>Escrito por: {ref.Escrito}</p>
                </div>
            </div>
        </div>}
        {!ref && <div style={{width: '100vw',height: '100vh',display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}}>
        <h1>Não foi encontrado uma referência de História.</h1>
        <NavLink to={'/'} style={{fontSize: '40px'}}>Voltar para o início</NavLink>
        </div>}
        {ref && <div style={{padding: '16px 128px'}}>
                <Division />
                <div>
            <h1>Comentários</h1>
            <p style={{margin: '20px 0px',fontSize: '24px'}}>
            Dê seu feedback sobre a história!
            </p>
            <textarea value={text} onChange={(e) => {setText(e.target.value)}} style={{backgroundColor: '#181818',color: 'white',padding: '8px 12px',fontFamily: 'Arial',fontSize: '18px',borderRadius: '8px',width: '50%',height: '100px'}}></textarea>
                <br />
                <button onClick={SubmitComent} style={{fontSize: '24px',padding: '8px 14px',marginTop: '24px',border: '3px solid transparent',borderRadius: '8px',backgroundColor: '8px',color: 'white',backgroundColor: '#B140A6'}}>ENVIAR</button>
                <Division />
                </div>
                  <div>
                    <h1 style={{fontSize: '52px'}}>{`${coments.length}`} Comentário{coments.length > 1 && 's'}</h1>
                    <div style={{display: 'flex',flexDirection: 'column-reverse'}}>
                    {coments.length > 0 && coments.map((item) => (
                        <div style={{width: 'calc(360px - 32px)',display: 'flex',flexDirection: 'column',height: 'calc(140px - 20px)',padding: '10px 16px',backgroundColor: '#080808',marginTop: '32px',borderRadius:'25px'}}>
                            <div>
                            <p style={{fontSize: '14px',color: 'rgba(255,255,255,.7)',fontStyle: 'italic'}}>Feito por {item.Name}</p>
                            {/* <p>{item.data}</p> */}
                            </div>
                            <p style={{fontSize: '32px',whiteSpace: 'normal',width: '318px'}}>{item.Text}</p>
                        </div>
                    ))}
                    </div>
                    </div>  
            </div>
            }
        </main>
    </div>
  )
}

export default Hist