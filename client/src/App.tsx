import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage  from './pages/landing/landingPage';
import QuizPage  from './pages/quiz/quizPage';
import store from './store/store';
import { Provider } from 'react-redux';


export default function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/quiz/:quizId" element={<QuizPage/>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}
