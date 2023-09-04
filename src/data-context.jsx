import {useContext,createContext,useState,useEffect} from "react"





export const DataContext = createContext();

export const DataProvider = ({children}) =>{

    const [questions,setQuestions] =useState([]);
    const [currentQuestion,setCurrentQuestion] = useState(0);
    const [useremail,setUseremail] = useState("");
    const [selectedOption,setSelectedOption] = useState(-1);
   
  
    

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










    return(
        <DataContext.Provider value = {{questions,setQuestions,currentQuestion,setCurrentQuestion,useremail,setUseremail,selectedOption,setSelectedOption

        }}>
            {children}
        </DataContext.Provider>
    )
}
export const useData = ()=>useContext(DataContext);
