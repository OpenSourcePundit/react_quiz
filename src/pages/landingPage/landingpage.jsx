import {useState} from "react"
import "./landingpage.css"
import { useData } from "../../data-context";
import { useNavigate } from "react-router-dom"
export const LandingPage = () =>{
  const navigate = useNavigate();

  const {setUseremail} = useData();
  const [email,setEmail]=useState()


    return(
        <div className="main-container">
            <div className="center-container">
                <h2 className="welcome-note">
                    Welcome to <span className="my-quiz-logo">MY</span>- <span className="quiz-logo">QUIZ</span> 
                </h2>
                <h3>Enter Your Email to begin the Quiz</h3>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <button onClick={()=>{setUseremail(email);navigate('/quiz')}}>Submit and Start</button>
                <div className="quiz-details">
                    <p>There are 15 Quiz. </p>
                    <p>maximum time alloted is 15 minutes the Quiz will auto submit after 15 minutes.</p>
                </div>
            </div>
        </div>
    )
}