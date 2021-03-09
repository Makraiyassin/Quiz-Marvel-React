import React, {useRef, useEffect, useState, Fragment} from 'react'
import {Link} from 'react-router-dom'

const Landing = () => {

    const refWolverine = useRef(null)

    const [btn, setBtn] = useState(false)

    useEffect(()=> {
        setTimeout(() => {
            refWolverine.current.classList.add("startingImg")
            setTimeout(() => {
                refWolverine.current.classList.remove("startingImg")
                setBtn(true)
            }, 600);      
        }, 300);
    },[])

    const setLeftImg = ()=>{
        refWolverine.current.classList.add("leftImg")
    }
    const setRightImg = ()=>{
        refWolverine.current.classList.add("rightImg")
    }

    const clearImg = () => {
        refWolverine.current.classList.remove("rightImg")
        refWolverine.current.classList.remove("leftImg")
    }

    const DisplayBtn = btn && (
        <Fragment>
            <div className="leftBox">
                <Link onMouseOver={setLeftImg} onMouseOut={clearImg} className="btn-welcome" to="/signup">Inscription</Link>
            </div>
            <div className="rightBox">
                <Link onMouseOver={setRightImg} onMouseOut={clearImg} className="btn-welcome" to="/login">Connexion</Link>
            </div>
        </Fragment>
    )

    return (
        <main ref={refWolverine} className="welcomePage">
            {DisplayBtn}
        </main>
    )


}

export default Landing
