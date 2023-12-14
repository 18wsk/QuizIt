
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import QuestionComponent from "../../components/questions";
import { setCurrentAnswer, setCurrentQuestion, setQuestions } from "../../store/quizSlice";
import clsx from "clsx";
import { OptionsModal } from "../../components/landing/optionsModal";
import { useEffect } from "react";

const QuizPage = () => {
    const dispatch = useDispatch();
    // HANDLE GETTING THE STATE FROM LOCALSTORAGE
    // TODO: FIX --> USE DB
    const persisted = localStorage.getItem("quiz") ?? "";
    const questions = JSON.parse(persisted);
    dispatch(setQuestions(questions));


    const currentQuestion = useSelector((state: RootState) => state.quiz.currentQuestion);
    const currentUser = useSelector((state: RootState) => state.quiz.currentUser);
    const currentAnswer = useSelector((state: RootState) => state.quiz.currentAnswer);
    const darkMode = useSelector((state: RootState) => state.quiz.darkMode);


    const handleNextQuestion = () => {
        dispatch(setCurrentQuestion(currentQuestion+ 1));
        dispatch(setCurrentAnswer(null));
    }

    useEffect(() => {
        // Dispatch your action here
        dispatch(setCurrentAnswer(null));
      }, [dispatch]); // Empty dependency array means this effect runs once on mount

    return (
        <div className={`${darkMode ? "bg-dark-primary" : "bg-gradient-to-r from-secondary to-primary"}  w-screen h-screen flex flex-col items-center 
            justify-center`}>
            <motion.div
                className="w-full h-full flex flex-col items-center justify-center px-4 pt-4 overflow-hidden"
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{ duration: 0.5 }}
            >
                <div className="w-full h-full">
                    <div className="w-full pl-[64px] h-[66px] flex flex-cols-3 items-center justify-between">
                        <Link to="/" className="w-full text-5xl font-extrbold font-libre h-[66px] text-white text-center">QuizIt</Link>
                        <div className="w-[32px] flex items-center justify-end"><OptionsModal nav={true} /></div>
                    </div>
                    <div className="w-full h-[calc(100vh-66px-4rem)] flex flex-col items-center justify-center ">
                        <div 
                            className="w-[500px] h-[600px] rounded-lg p-2 shadow-white shadow-xl
                            border-[1px] border-primary bg-opacity-30 backdrop-filter backdrop-blur-md"
                        >
                            <h2 
                                className={clsx(
                                    !(currentQuestion <= 9) && "hidden", (currentQuestion <= 9) && `w-fit absolute top-2 left-1/2 -translate-x-1/2 text-center 
                                    font-libre  text-white text-sm p-2 bg-primary/20 rounded-lg`)}>
                                SCORE: {currentUser?.currentScore}
                            </h2>
                            <div className="w-full flex flex-row items-center justify-end gap-x-4">
                            
                                <h3 className="font-libre text-white/90 underline underline-offset-4 text-sm text-end p-2 decoration-secondary">
                                    {(currentQuestion+1) < 10 ? currentQuestion+1 : 10} of 10
                                </h3>
                            </div>
                            <div className="w-full h-[500px]">
                                <QuestionComponent questions={questions} currentQuestionIdx={currentQuestion} />
                            </div>
                            <div className="w-full h-fit flex items-center justify-center">
                                {currentAnswer && 
                                    <button 
                                        className="h-fit w-[128px] hover:scale-110 duration-50 text-white font-roboto bg-secondary p-1 rounded-lg"
                                        onClick={() => handleNextQuestion()}
                                    >
                                        Next
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default QuizPage