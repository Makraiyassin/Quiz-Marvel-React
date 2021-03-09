import React, {useState, Fragment, useContext, useEffect} from 'react'
import {FirebaseContext} from '../firebase'
import Logout from '../logout'
import Quiz from '../quiz'
import Loader from '../loader'

const Welcome = props => {

    const firebase = useContext(FirebaseContext)

    const [userSession, setUserSession] = useState(null)
    const [userData, setUserData] = useState({})
    
    useEffect(() => {
        
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/')

        })

        if(userSession !== null){

            firebase.user(userSession.uid)
            .get()
            .then(user=>{
                if(user && user.exists){
                    const myData = user.data()
                    setUserData(myData)
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        } 
            
        return () => {
            listener()
        }
    }, [userSession])

    return userSession === null ? (
        <Loader
            loadingMsg={"Authentification"}
            styling={{textAlign:'center', color:'white'}}
        />
    ) : (
        <div className="quiz-bg">
            <div className="container">
                <Logout/>
                <Quiz userData={userData}/>
            </div>
        </div>
    )
}

export default Welcome
