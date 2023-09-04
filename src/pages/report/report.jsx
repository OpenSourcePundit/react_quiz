import "./report.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck,faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useData } from "../../data-context";
export const Report = () => {
  const navigate = useNavigate();
  const { questions, useremail } = useData();
  console.log(questions);
  const score = questions.reduce((total, ques) => {
    if (ques.correct_answer === ques.userOption) {
      return total + 1;
    } else {
      return total;
    }
  }, 0);

  return (
    <div className="main-quiz-container">
      <h2 className="header">
        <span className="my-quiz-logo">MY</span>-{" "}
        <span className="quiz-logo">QUIZ</span>
      </h2>
      <div className="details-holder">
        <h3 className="timer">Obtained Score: {score}/15 </h3>
        <h3 className="user-name-holder">Email:{useremail}</h3>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Start New Quiz{" "}
        </button>
      </div>
      <div className="report-container">
        <div className="report-holder">
          {questions.map((ques, index) => {
            return (
              <div className="questions-holder">
                <div className="single-question">
                  {index + 1}.{ques.question}
                </div>
                <div>
                  {ques.options.map((option, index) => {
                    return (
                      <div className="option">
                        {String.fromCharCode(65 + index)}.{option}
                        {option === ques.correct_answer && (
                          <FontAwesomeIcon icon={faCheck} />
                        )}
                        {option === ques.userOption && <FontAwesomeIcon icon={faCheckDouble} /> }
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
