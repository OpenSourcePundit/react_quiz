import {Routes,Route} from "react-router-dom"
import './App.css';
import { LandingPage } from './pages/landingPage/landingpage';
import { Report } from "./pages/report/report";
import { QuizPage } from "./pages/quizPage/quizpage";
function App() {
  return (
    <div className="App">
      //routes
      <Routes>
      <Route path="/" element={ <LandingPage/>}  />
      <Route path ="/quiz" element={<QuizPage/>} />
      <Route path ="/report" element={<Report/>} />
      </Routes>
    </div>
  );
}

export default App;
