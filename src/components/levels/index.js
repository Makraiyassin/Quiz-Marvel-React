import React, {useEffect, useState} from 'react'
import Stepper from 'react-stepper-horizontal'

const Levels = ({levelNames,quizLevel}) => {

    const [levels, setLevels] = useState([])

    useEffect(() => {
        const quizSteps = levelNames.map(level => ({title : level.toUpperCase()}))
        setLevels(quizSteps)
    },[levelNames])

    return (
        <div className="levelsContainer" style={{background:'transparent'}}>
            <Stepper 
                steps={levels} 
                activeStep={quizLevel} 
                circleTop={0}
                activeTitleColor={'#ed4040'}
                activeColor={'#ed4040'}
                completeTitleColor={'#757575'}
                completeColor={'#e0e0e0'}
                completeBarColor={'#e0e0e0'}
            />
        </div>
    )
}

export default React.memo(Levels)
