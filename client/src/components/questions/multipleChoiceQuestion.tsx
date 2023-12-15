import clsx from 'clsx';
import { Question } from '../../types/Question';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAnswer, updateScore } from '../../store/quizSlice';
import { RootState } from "../../store/store";
import { useEffect } from 'react';
import { Transition } from '@headlessui/react';

export const MultipleChoiceQuestion = ({ question, isShowing } : { question: Question , isShowing: boolean }) =>{
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
    }, [dispatch]);
    

    return (
        <>
            <Transition
                appear={true}
                show={isShowing}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
            >
                <div className="w-full h-[260px] flex flex-col items-center justify-center">
                    <div className="w-full h-fit text-center font-roboto text-xl flex items-center justify-center text-white">
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
                                currentAnswer && val !== currentAnswer && val !== correctAnswer && "hover:scale-100 hover:shadow-transparent contrast-50",
                                currentAnswer !== null && correctAnswer === val && "bg-green-500 hover:scale-100 hover:shadow-transparent hover:contrast-125",
                                currentAnswer && currentAnswer === val && currentAnswer !== correctAnswer && "bg-red-500 hover:scale-100 hover:shadow-transparent hover:contrast-125"
                            )}
                            onClick={() => handleSubmit(val)}
                        >
                            {val}
                        </button>
                    ))}
                </div>
            </Transition>
        </>
    );
}
