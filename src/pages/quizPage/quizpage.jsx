 import "./quizpage.css"
import React, {useState} from "react"
import { useNavigate } from "react-router-dom"
import { useData } from "../../data-context";
import { NavigationPanel } from "../../components/navigation-panel";



export const QuizPage = () =>{
  const navigate = useNavigate();
  const {questions,setQuestions,useremail,currentQuestion,setCurrentQuestion,selectedOption,setSelectedOption} = useData();
  console.log(questions)
  
  console.log(selectedOption)


    const markVisited = ()=>{
        let temp = questions;
        temp[currentQuestion].visited=true;
        setQuestions(temp);
        setSelectedOption(questions[currentQuestion]?.userOption);
}
    const saveAndNextFunction = () =>{
        let temp = questions;

        temp[currentQuestion].userOption=selectedOption;
        temp[currentQuestion].visited=true;
        
        
        if(selectedOption!==-1){temp[currentQuestion].attempted=true;}
        else if(questions[currentQuestion].attempted===true){temp[currentQuestion].attempted=true;}
        else
            {temp[currentQuestion].attempted=false;}
        
        
        setQuestions(temp);
        setSelectedOption(questions[currentQuestion+1]?.userOption); //
        setCurrentQuestion(currentQuestion+1);
    }
    const getCheckedOption = (option) =>{
        if(questions[currentQuestion].userOption!==-1){
           return questions[currentQuestion].userOption === option
        } else{
            return option === selectedOption;
        }

    }
    const clearSelectionFunction = () =>{
        setSelectedOption(-1);
        let temp = questions;
        temp[currentQuestion].userOption=-1;  
        temp[currentQuestion].attempted=false;      
        setQuestions(temp);
    }
    const saveAndSubmit = () =>{
        let temp = questions;

        temp[currentQuestion].userOption=selectedOption;
        temp[currentQuestion].visited=true;
        
        
        if(selectedOption!==-1){temp[currentQuestion].attempted=true;}
        else if(questions[currentQuestion].attempted===true){temp[currentQuestion].attempted=true;}
        else
            {temp[currentQuestion].attempted=false;}
        
        
        setQuestions(temp);
        navigate('/report')

    }
    {console.log(questions,selectedOption)}


    return(
        <div className="main-quiz-container">
            <h2 className="header"><span className="my-quiz-logo">MY</span>- <span className="quiz-logo">QUIZ</span></h2>
            <div className="details-holder">
                <h3 className="timer">Time Left:  03:36 <i class="bi bi-terminal-plus"></i></h3>
               <h3 className="user-name-holder">Email:{useremail}</h3>
               {currentQuestion!==14 &&  <button onClick={()=>saveAndSubmit()}>Save and Submit </button>}
            </div>
            <div className="quiz-container">
                <div className="quiz-ques-holder">
                    <h3 className="question-number">Question {questions[currentQuestion]?._id}.</h3>
                    <h3 className="question-statement">{questions[currentQuestion]?.question}</h3>
                    {questions[currentQuestion]?.options.map((option,index)=>{ 
                        return(<>
                            
                            <h3 className="options">{String.fromCharCode(65+index)}.{option}   <input type="radio" name="xyz" id="options" checked={getCheckedOption(option)}  value={option} onChange={(e)=>setSelectedOption(e.target.value)} /> </h3>
                           
                            </>
                        )
                    })}

                    <div className="buttons-control">
                        <button onClick={()=>{if(currentQuestion!==0){markVisited(currentQuestion);setCurrentQuestion(currentQuestion-1)}}}>Previous</button>
                        <button onClick={()=>clearSelectionFunction()}>Clear Selection</button>
                        {currentQuestion===14 ? <button onClick={()=>saveAndSubmit()}>Save and Submit </button> :<button onClick={()=>saveAndNextFunction()}>Save and Next </button>}
                        
                        
                    </div>

                </div>
                <NavigationPanel/>
            </div>
        </div>
    )
}