import React, {useState, useContext} from 'react'
import {FirebaseContext} from '../firebase'
import { Link } from 'react-router-dom'

const SignUp = (props) => {
    const firebase = useContext(FirebaseContext)

    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirm: '',
    }

    const[loginData,setLoginData] = useState(data)

    const [error, setError] = useState('')
    
    const handleChange = e => {
        setLoginData({...loginData, [e.target.id]: e.target.value})
    }

    const handleSubmit = e =>{
        e.preventDefault()
        const {email, password, pseudo} = loginData
        firebase.signupUser(email,password)
        .then(authUser=>{
            console.log(authUser);

            return firebase.user(authUser.user.uid).set({
                pseudo,
                email
            })
        })
        .then(() => {
            setLoginData({...data});
            props.history.push('/welcome')
        })
        .catch(error => {
            setError(error);
            setLoginData({...data});
        })
    }


    const {pseudo, email, password, confirm} = loginData

    const btn = pseudo === '' || email === '' || password === '' || password !== confirm
    ? <button disabled>Inscription</button> : <button>Inscription</button>
    

    //gestion erreurs
    const errorMsg = error !== '' && <span>{error.message}</span>

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        <form onSubmit={handleSubmit}>

                            {errorMsg}
                            <h2>Inscription</h2>
                            <div className="inputBox">
                                <input onChange={handleChange} value={pseudo} type="text" id="pseudo"  required />
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={email} type="email" id="email"  required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={password} type="password" id="password"  required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={confirm} type="password" id="confirm"  required />
                                <label htmlFor="confirm">Confirmer mot de passe</label>
                            </div>
                            {btn}
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

export default SignUp
