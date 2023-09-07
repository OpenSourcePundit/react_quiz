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
      <p className="heading">Questions:</p>
      <div className="questions-panel">
        {questions?.map((question, index) => {
          return (
            <div className="outer">
              <div
                onClick={() => {
                  markVisited(index);
                  setCurrentQuestion(index);
                }}
                className={
                  //class to show correct color for attempted and visited and yet to visit questions
                  currentQuestion === index
                    ? question.visited
                      ? question.attempted
                        ? "outline green border"
                        : "outline red border"
                      : "outline border"
                    : question.visited
                    ? question.attempted
                      ? "outline green"
                      : "outline red"
                    : "outline"
                }
              >
                {" "}
                <span className="question-no">{index + 1}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
