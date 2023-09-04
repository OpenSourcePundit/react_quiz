import { useData } from "../data-context";
import "./navigation-panel.css";

export const NavigationPanel = () => {
  const {
    questions,
    setQuestions,
    currentQuestion,
    setCurrentQuestion,
    selectedOption,
    setSelectedOption,
  } = useData();

  const markVisited = (index) => {
    let temp = questions;
    temp[currentQuestion].visited = true;
    setQuestions(temp);
    setSelectedOption(questions[index].userOption);
  };

  return (
    <div className="navigation-panel">
      <h3 className="heading">Questions:</h3>

      <div className="questions-panel">
        {console.log(questions)}
        {questions?.map((question, index) => {
          return (
            <div className="outer">
              <div
                onClick={() => {
                    markVisited(index);
                  setCurrentQuestion(index);

                  
                }}
                className={
                  currentQuestion === index
                    
                  
                  ? (question.visited
                      ? question.attempted
                        ? "outline green border"
                        : "outline red border"
                      : "outline border")
                    
                    
                    
                    
                    
                    
                      :
                    
                    ( question.visited
                    ?( question.attempted
                      ? "outline green"
                      : "outline red")
                     
                      : "outline")
                }
              ></div>
              <h4>{index + 1}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};
