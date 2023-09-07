import {useState} from "react"
import "./landingpage.css"
import { useData } from "../../data-context";
import { useNavigate } from "react-router-dom"
export const LandingPage = () =>{
  const navigate = useNavigate();

  const {setUseremail,startTimer} = useData();
  const [email,setEmail]=useState()


    return(
        <div className="main-container-landing">
            <div className="center-container-landing">
                <h2 className="welcome-note">
                    Welcome to MYQUIZ
                </h2>
                <h3>Enter Your Email to begin the Quiz</h3>
                <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <button className="details-btn" onClick={()=>{setUseremail(email);navigate('/quiz');startTimer()}}>Submit and Start</button>
                <div className="quiz-details">
                    <p>There are 15 Quiz. </p>
                    <p>Maximum time alloted is 15 minutes the Quiz will auto submit after 15 minutes.</p>
                </div>
            </div>
        </div>
    )
}