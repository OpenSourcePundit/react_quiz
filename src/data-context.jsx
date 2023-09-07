import {useContext,createContext,useState,useEffect} from "react"
import { useNavigate } from "react-router-dom";




export const DataContext = createContext();

export const DataProvider = ({children}) =>{

    const navigate = useNavigate();

    const [questions,setQuestions] =useState([]);
    const [currentQuestion,setCurrentQuestion] = useState(0);
    const [useremail,setUseremail] = useState("");
    const [selectedOption,setSelectedOption] = useState(-1);
    const [time,setTime] = useState({min:14,sec:59})
    
    var updateMin = time.min,updateSec=time.sec;
    var refresh;

    const startTimer = () =>{
        console.log("Start timer")

        run();
        

        refresh =  setInterval(run,1000)
    }



    const run =() =>{
        
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
