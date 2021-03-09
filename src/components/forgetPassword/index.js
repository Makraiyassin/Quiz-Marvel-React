import React,{useState,useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import {FirebaseContext} from '../firebase'


const ForgetPassword = (props) => {
    
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    const firebase = useContext(FirebaseContext)

    const handleSubmit = e => {
        e.preventDefault()
        firebase.passwordReset(email)
        .then (()=>{
            setError(null)
            setSuccess(`consultez votre email ${email} pour changer le mot de passe`)
            setTimeout(()=>{
                props.history.push('/login')
            },5000)
        })
        .catch(err=>{
            setError(err)
            setEmail('')
        })
    }

    const disabled = email === ''

    return (
        <div className="signUpLoginBox">  
            <div className="slContainer">
                <div className="formBoxLeftForget">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">

                        <h2>Mot de passe Oublié?</h2>
                        <form onSubmit={handleSubmit}>

                            {success && <span style={{
                                border:'1px solid green',
                                color: 'green',
                                marginBottom:'30px',
                            }}>{success}</span>}

                            {error && <span>{error.message}</span>}

                            <div className="inputBox">
                                <input onChange={e=> setEmail(e.target.value)} value={email} type="email" id="email"  required />
                                <label htmlFor="email">Email</label>
                            </div>
                            <button disabled={disabled}>Récupérer</button>
                        </form>
                        <div className='linkContainer'>
                            <Link className='simpleLink' to='/login'>Déjà inscrit? Connectez-vous</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword
