import {useContext,createContext,useState,useEffect} from "react"
import { useNavigate } from "react-router-dom";




export const DataContext = createContext();

export const DataProvider = ({children}) =>{

    const navigate = useNavigate();

    const [questions,setQuestions] =useState([]); //contains all questions
    const [currentQuestion,setCurrentQuestion] = useState(0); // holds current question index
    const [useremail,setUseremail] = useState(""); // holds user information
    const [selectedOption,setSelectedOption] = useState(-1); // holds user selected option
    const [time,setTime] = useState({min:14,sec:59}) //timer
    var updateMin = time.min,updateSec=time.sec; // to update time
    var refresh;

    const startTimer = () =>{
        run();
        refresh =  setInterval(run,1000)
    }



    const run =() =>{  //callback to run timer
        
        console.log("Running")
        if(updateMin ===0 && updateSec===0){
            clearInterval(refresh);
            refresh=null;
            navigate("/report");
        }
        if(updateSec === 0){
            updateMin--;
            updateSec = 59;
        }
         
        updateSec--;
        return setTime({min:updateMin,sec:updateSec})
    }
   
  
    

    const getData = () =>{
        //fetching data from server
       fetch("https://opentdb.com/api.php?amount=15")
    .then(res=>res.json())
    .then(data =>  setQuestions(data.results.map((ques,index)=>{
        let options = [];
        options.push(...ques?.incorrect_answers)
        options.push(ques?.correct_answer)
        return({...ques,_id:index+1,visited:false,attempted:false,userOption:-1,options:options})

    })));
    }

    useEffect(()=>getData(),[])
    //reset function

    const Reset = () =>{
        setQuestions([]);
        setCurrentQuestion(0);
        setUseremail("");
        setSelectedOption(-1);
        getData();
        setTime({min:14,sec:59})
        navigate("/");
        
    }








    return(
        <DataContext.Provider value = {{questions,setQuestions,currentQuestion,setCurrentQuestion,useremail,setUseremail,selectedOption,setSelectedOption,Reset,time,startTimer,

        }}>
            {children}
        </DataContext.Provider>
    )
}
export const useData = ()=>useContext(DataContext);
