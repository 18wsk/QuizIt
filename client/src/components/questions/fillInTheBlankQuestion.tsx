import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Question } from '../../types/Question';
import { useDispatch } from 'react-redux';
import { setCurrentAnswer, updateScore } from '../../store/quizSlice';
import { FaArrowRight } from 'react-icons/fa';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { useState } from 'react';

export const FillInTheBlankQuestion = ({ question }: { question: Question }) =>{
    const correctAnswer = question.answer
    console.log(question.answer)

    const [inputVal, setInputVal] = useState<string>("");
    const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(false)

    const dispatch = useDispatch();

    const handleSubmit = () => {
        setAnswerSubmitted(true);
        dispatch(setCurrentAnswer(inputVal));
        // TODO: handle points logic
        if (inputVal && inputVal.toLowerCase() === correctAnswer) {
            dispatch(updateScore());
            setInputVal("")
        }
    }

    return (
        <AnimatePresence initial={false}>
            <motion.div 
                className="w-full h-[460px] rounded-lg"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 1000 }}
            >
                <div className="w-full h-[340px] flex flex-col items-center justify-center">
                    <div className={clsx(
                        "w-full h-fit text-center font-roboto text-xl flex items-center justify-center",
                        answerSubmitted ? (inputVal===correctAnswer ? "text-secondary" : "text-red-300") : "text-white"
                        )}>
                        {answerSubmitted ? (inputVal===correctAnswer ? <IoMdCheckmark size={200} className={"text-green-500"}/> : <IoMdClose size={200} className={"text-red-500"}/>): question.question}
                    </div>
                    <h3 className={clsx(
                        answerSubmitted ? "w-full text-center font-roboto text-lg pt-8 text-white" : "hidden"
                    )}>Answer: {question.answer}</h3>
                </div>
                <div className="w-full h-[60px] flex items-center justify-center px-8 pb-4">
                    <div className="w-full h-fit py-2 flex flex-col items-center justify-center">
                        <div className="w-full bg-transparent/10 rounded-full flex flex-row focus:border-primary border-2 border-transparent">
                            <input 
                                className="placeholder-white/20 outline-none focus:outline-none w-full h-fit py-2 px-4 rounded-full bg-transparent 
                                            text-white text-sm"
                                value={inputVal ?? null}
                                maxLength={50}
                                onChange={(e) => setInputVal(e.target.value)}
                                placeholder={inputVal.trim() === '' ? 'Answer' : ''}
                                disabled={answerSubmitted}
                                />
                            <button 
                                className={
                                    clsx("outline-none focus:outline-none py-2 px-4 rounded-full text-white border-2 border-transparent",
                                        !answerSubmitted && inputVal.length > 0 && 'bg-secondary rounded-full hover:bg-transparent  hover:border-secondary hover:text-secondary'
                                    )}
                                onClick={() => handleSubmit()}
                                disabled={answerSubmitted}
                                    >
                                    <FaArrowRight/>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}