import clsx from 'clsx';
import { Question } from '../../types/Question';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAnswer, updateScore } from '../../store/quizSlice';
import { RootState } from "../../store/store";
import { useEffect } from 'react';

export const MultipleChoiceQuestion = ({ question } : { question: Question }) =>{
    const currentAnswer = useSelector((state: RootState) => state.quiz.currentAnswer);
    
    const correctAnswer: string = question.options ? question.answer : "";
    
    const dispatch = useDispatch();

    const handleSubmit = (val: string) => {
        if (!currentAnswer) {
            dispatch(setCurrentAnswer(val));
            // TODO: handle points logic
            if (val === correctAnswer) {
                dispatch(updateScore());

            }
        }
    };

    useEffect(() => {
        // Dispatch your action here
        dispatch(setCurrentAnswer(null));
      }, [dispatch]); // Empty dependency array means this effect runs once on mount
    

    return (
        <>
            <div className="w-full h-[260px] flex flex-col items-center justify-center">
                <div className="w-full h-fit text-center font-roboto text-2xl flex items-center justify-center text-white">
                    {question.question}
                </div>
            </div>
            <div className="w-full h-[200px] grid grid-cols-2 gap-x-4 gap-y-4 px-4 pb-4">
                {question.options && question.options.map((val, index) => (
                    <button
                        key={index}
                        value={val}
                        className={clsx("w-full h-full flex items-center justify-center text-secondary border-[2px] border-primary",
                            "font-roboto px-4 py-2 rounded-lg duration-200 text-white hover:shadow-md hover:shadow-white hover:scale-110 hover:contrast-125",
                            !currentAnswer && "hover:bg-secondary/50",
                            currentAnswer !== null && correctAnswer === val && "bg-green-500",
                            currentAnswer && currentAnswer === val && currentAnswer !== correctAnswer && "bg-red-500"
                        )}
                        onClick={() => handleSubmit(val)}
                    >
                        {val}
                    </button>
                ))}
            </div>
        </>
    );
}
