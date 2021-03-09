import React,{Component,Fragment} from 'react'
import Levels from '../levels'
import ProgressBar from '../progressBar'
import {QuizMarvel} from '../quizMarvel'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import QuizOver from '../quizOver'
import {FaChevronRight} from 'react-icons/fa'

toast.configure()

const initialState = {
    quizLevel : 0,
    maxQuestions: 10,
    storedQuestions: [],
    questions : null,
    options:[],
    idQuestion:0,
    btnDisable:true,
    userAnswer: null,
    score: 0,
    showWelcomeMsg:false,
    quizEnd : false,
    percent : null,
}

const levelNames = ["debutant","confirme", "expert"]


class Quiz extends Component {
    constructor(props) {
        super(props)

        this.state = initialState
        this.storeDataRef = React.createRef()
    }
    
    loadQuestions = level => {
        const fetchQuiz = QuizMarvel[0].quizz[level]
        if(fetchQuiz.length >= this.state.maxQuestions){

            this.storeDataRef.current = fetchQuiz

            const newArray = fetchQuiz.map(({answer, ...keepRest})=>keepRest)
            this.setState({
                storedQuestions:newArray
            })
        }
    }
    
    componentDidMount(){
        this.loadQuestions(levelNames[this.state.quizLevel])
    }

    componentDidUpdate(prevProps,prevState){

        const {
            maxQuestions,
            storedQuestions,
            idQuestion,
            score,
            quizEnd,
        }=this.state


        if(storedQuestions !== prevState.storedQuestions && storedQuestions.length){
            // console.log( storedQuestions[0]);
            this.setState({
                questions: storedQuestions[idQuestion].question,
                options: storedQuestions[idQuestion].options,
            })
        }
        
        if(idQuestion !== prevState.idQuestion  && storedQuestions.length){
            this.setState({
                questions: storedQuestions[idQuestion].question,
                options: storedQuestions[idQuestion].options,
                userAnswer : null,
                btnDisable:true,
            })
        }

        if(this.props.userData.pseudo !== prevProps.userData.pseudo){
            this.showToastMsg(this.props.userData.pseudo)
        }

        if(quizEnd !== prevState.quizEnd){
            const gradePercent= this.getPercent(maxQuestions,score)
            this.gameOver(gradePercent)
        }
    }

    showToastMsg = pseudo => { 
        if(!this.state.showWelcomeMsg){

            this.setState({showWelcomeMsg: true})

            toast.warn(` Bienvenu ${pseudo}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                quizEnd : false
            });
        }
    }
    
    submitAnswer = selectedAnswer =>{
        this.setState({
            userAnswer : selectedAnswer,
            btnDisable:false
        })
    }

    getPercent = (maxQuest,ourScore)=>(ourScore/maxQuest)*100

    gameOver = percent =>{

        if(percent >= 50){
            this.setState({
                quizLevel:this.state.quizLevel +1,
                percent
            })
        }else{this.setState({percent})}

        console.log('game over');
    }

    nextQuestion = ()=>{

        if(this.state.idQuestion === this.state.maxQuestions -1){

            this.setState({quizEnd:true})

        }else{

            this.setState(prevState => ({idQuestion : prevState.idQuestion +1}))
        
        }    

        const goodAnswer = this.storeDataRef.current[this.state.idQuestion].answer
        
        if(this.state.userAnswer === goodAnswer){

            this.setState(prevState=>({score: prevState.score + 1}))
            
            toast.success('Bravo! +1', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }else{

            toast.error('Raté! +0', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
        }
    }

    loadLevelQuestions = param => {
        this.setState({...initialState, quizLevel:param})
        this.loadQuestions(levelNames[param])
    }

    render(){

        const {
            quizLevel,
            maxQuestions,
            questions,
            options,
            idQuestion,
            btnDisable,
            userAnswer,
            score,
            quizEnd,
            percent,        
        }=this.state

        // const pseudo = this.props.userData.pseudo

        const displayOptions = options.map((option, index)=>{
            return (
                <p  key={index}
                    className= {`answerOptions ${userAnswer === option && "selected"}`}
                    onClick={()=> this.submitAnswer(option)}
                >
                    <FaChevronRight/> {option}
                </p>
            )
        })

        return quizEnd? (
            <QuizOver 
                ref= {this.storeDataRef}
                levelNames={levelNames}
                score={score}
                maxQuestions={maxQuestions}
                quizLevel={quizLevel}
                percent={percent}
                loadLevelQuestions={this.loadLevelQuestions}
            />
        ):(
            <Fragment>
                <Levels
                    levelNames={levelNames}
                    quizLevel={quizLevel}
                />
                <ProgressBar 
                    idQuestion={idQuestion}
                    maxQuestions={maxQuestions}
                />
                <h2>{questions}</h2>
                {displayOptions}
                <button 
                    disabled={btnDisable} 
                    className="btnSubmit"
                    onClick={this.nextQuestion}
                > {idQuestion < maxQuestions-1 ? "suivant" : "terminer"} </button>
            </Fragment>
        )
    }
}
    
export default Quiz