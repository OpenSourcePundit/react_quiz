import "./quizpage.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../data-context";
import { NavigationPanel } from "../../components/navigation-panel";

export const QuizPage = () => {
  const navigate = useNavigate();
  const {
    questions,
    setQuestions,
    useremail,
    currentQuestion,
    setCurrentQuestion,
    selectedOption,
    setSelectedOption,
    time,
    startTimer,
  } = useData();

  const markVisited = () => {
    // marks the current question as visited
    let temp = questions;
    temp[currentQuestion].visited = true;
    setQuestions(temp);
    setSelectedOption(questions[currentQuestion]?.userOption);
  };
  const saveAndNextFunction = () => {
    // save the current option in questions array and show next
    let temp = questions;

    temp[currentQuestion].userOption = selectedOption;
    temp[currentQuestion].visited = true;

    if (selectedOption !== -1) {
      temp[currentQuestion].attempted = true;
    } else if (questions[currentQuestion].attempted === true) {
      temp[currentQuestion].attempted = true;
    } else {
      temp[currentQuestion].attempted = false;
    }

    setQuestions(temp);
    setSelectedOption(questions[currentQuestion + 1]?.userOption); //next question
    setCurrentQuestion(currentQuestion + 1);
  };
  const getCheckedOption = (option) => {
    //get selected option  from questions array
    if (questions[currentQuestion].userOption !== -1) {
      return questions[currentQuestion].userOption === option;
    } else {
      return option === selectedOption;
    }
  };
  const clearSelectionFunction = () => {
    // clear selection in questions array andf on DOM
    setSelectedOption(-1);
    let temp = questions;
    temp[currentQuestion].userOption = -1;
    temp[currentQuestion].attempted = false;
    setQuestions(temp);
  };
  const saveAndSubmit = () => {
    //submit quiz and get report
    let temp = questions;

    temp[currentQuestion].userOption = selectedOption;
    temp[currentQuestion].visited = true;

    if (selectedOption !== -1) {
      temp[currentQuestion].attempted = true;
    } else if (questions[currentQuestion].attempted === true) {
      temp[currentQuestion].attempted = true;
    } else {
      temp[currentQuestion].attempted = false;
    }

    setQuestions(temp);
    navigate("/report");
  };
  {
    console.log(questions, selectedOption);
  }

  return (
    <div className="main-quiz-container">
      <h2 className="header">MYQUIZ</h2>
      <div className="details-holder">
        {/* time left should change!? */}
        <h3 className="timer">
          Time Left: {time.min < 10 ? "0" + time.min : time.min}:
          {time.sec < 10 ? "0" + time.sec : time.sec}{" "}
          <i class="bi bi-terminal-plus"></i>
        </h3>
        <h3 className="user-name-holder">Email : {useremail}</h3>
        {currentQuestion !== 14 && (
          <button className="details-btn" onClick={() => saveAndSubmit()}>
            Save and Submit{" "}
          </button>
        )}
      </div>
      <div className="quiz-container">
        <div className="left">
          <div className="quiz-ques-holder">
            <h3 className="question-number">
              Question {questions[currentQuestion]?._id}.
            </h3>
            <h3 className="question-statement">
              {questions[currentQuestion]?.question}
            </h3>
            {questions[currentQuestion]?.options.map((option, index) => {
              return (
                <>
                  <h3 className="options">
                    {String.fromCharCode(65 + index)}.{option}{" "}
                    <input
                      type="radio"
                      className="radio-input"
                      name="xyz"
                      id="options"
                      checked={getCheckedOption(option)}
                      value={option}
                      onChange={(e) => setSelectedOption(e.target.value)}
                    />{" "}
                  </h3>
                </>
              );
            })}
          </div>
          <div className="buttons-control">
            <button //navigate to previous question
              className="control-btn"
              onClick={() => {
                if (currentQuestion !== 0) {
                  markVisited(currentQuestion);
                  setCurrentQuestion(currentQuestion - 1);
                }
              }}
            >
              Previous
            </button>{" "}
            
            <button
              className="control-btn"
              onClick={() => clearSelectionFunction()}
            >
              Clear Selection
            </button>
            {currentQuestion === 14 ? (
              <button onClick={() => saveAndSubmit()} className="details-btn">
                Save and Submit{" "}
              </button>
            ) : (
              <button
                className="control-btn"
                onClick={() => saveAndNextFunction()}
              >
                Save and Next{" "}
              </button>
            )}
          </div>
        </div>

        <NavigationPanel />
      </div>
    </div>
  );
};
