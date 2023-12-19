/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Spline from '@splinetool/react-spline';
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import clsx from 'clsx';
import axios from 'axios';
import { Question } from '../../types/Question';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { BarLoader } from 'react-spinners';

export const PlayModal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [quizTopic, setQuizTopic] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [failed, setFailed] = useState<boolean>(false);
    const [errorString, setErrorString] = useState<string | null>(null);
    const [text, setText] = useState<string>("Generating Your Quiz!");
    
    const quizId = useSelector((state: RootState) => state.quiz.id);

    setTimeout(() => {
        if (text === "Generating Your Quiz!") {
            setText("Some Quizes Take A While...")
        } else {
            setText("Generating Your Quiz!")
        }
    }, 3000)

    
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const createQuiz = async () => {
        setIsLoading(true);
        try {
            // const response = await axios.post('http://localhost:5000/generate-quiz', { quizTopic, quizId });
            const response = await axios.post('https://quizit-v0.onrender.com/generate-quiz', { quizTopic, quizId });
            const formattedQuestions: Question[] = response.data.questions;
            if (response.status === 200) {
                localStorage.setItem("quiz", JSON.stringify(formattedQuestions));
                window.location.href = `/quiz/${quizId}`;
            } else {
                setFailed(true);
            }
        } catch (error: any) {
            setErrorString(error.response.data.error);
            setFailed(true);
        }
        setIsLoading(false);
    };
    
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            createQuiz()
        }
    };

    return (
        <>
            <div className="flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className='h-[48px] w-[150px] rounded-full flex items-center justify-center font-roboto hover:shadow-md 
                    bg-primary text-white hover:shadow-white hover:scale-110 hover:contrast-125'
                >
                    Play
                </button>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-black/30" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center ">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className=" border-primary border-[1px] h-full w-full max-w-md transform overflow-hidden rounded-2xl 
                                    bg-opacity-30 backdrop-filter backdrop-blur-xl p-6 text-left align-middle shadow-xl transition-all flex flex-col items-center justify-center"
                                >
                                <Dialog.Title
                                    as="h3"
                                    className="text-2xl font-medium font-libre text-center text-white"
                                >
                                    Quiz Generator
                                    <button className='absolute top-4 right-8 text-white text-xl hover:bg-primary rounded-lg p-1' onClick={closeModal}>
                                        <MdOutlineClose />
                                    </button>
                                </Dialog.Title>
                                <div className="w-full h-full flex flex-col items-center justify-center">
                                    
                                    {
                                        isLoading 
                                            ? 
                                            <div className="h-[300px] w-[300px] flex flex-col items-center justify-center gap-y-8">
                                                <p className="xs:text-lg lg:text-xl text-center text-white font-libre pb-2 animate-pulse">{text}</p>
                                                <BarLoader
                                                    color="#B3D3C1"
                                                    height={8}
                                                    loading={isLoading}
                                                    width={200}
                                                />
                                            </div>
                                            :
                                            <div className="w-full h-full flex flex-col items-center justify-center ">
                                                <div className="w-[300px] h-[200px] flex flex-col items-center justify-center">
                                                    <Spline 
                                                        scene="https://prod.spline.design/Bgz5xbVnZzyOfTc9/scene.splinecode" 
                                                        className='className="w-[300px] h-[160px] flex items-center justify-center' 
                                                    />
                                                </div>
                                                <div className="w-full h-fit py-2 flex flex-col items-center justify-center gap-y-4">
                                                    { failed ? <p className="text-md text-white font-libre bg-red-300 rounded-lg text-center p-2">{errorString ? errorString : "GG"}</p> : <p className="text-md text-white font-libre rounded-lg text-center p-2">Enter A Topic and Start Your Quiz</p>}
                                                    <div className="w-full bg-transparent/10 rounded-full flex flex-row focus:border-primary border-2 border-transparent">
                                                        <input 
                                                            placeholder='Quiz Topic...' 
                                                            className="placeholder-white/20 outline-none focus:outline-none w-full h-fit py-2 px-4 rounded-full bg-transparent 
                                                                        text-white text-sm"
                                                            value={quizTopic}
                                                            maxLength={50}
                                                            min={3}
                                                            onChange={(e) => {
                                                                setQuizTopic(e.target.value);
                                                                setFailed(false);
                                                            }}
                                                            onKeyDown={handleKeyPress}
                                                            />
                                                        <div className="w-fit h-full flex flex-col items-center justify-cente text-white text-2xs">
                                                            {quizTopic.length}/50
                                                        </div>
                                                        <button
                                                            disabled={(quizTopic.length <= 3)}
                                                            className={
                                                                clsx("outline-none focus:outline-none py-2 px-4 rounded-full text-white border-2 border-transparent",
                                                                    quizTopic.length > 3 ? 'bg-primary rounded-full hover:bg-transparent hover:border-primary hover:text-primary cursor-pointer' : 'pointer-events-none',
                                                                )}
                                                            onClick={() => createQuiz()}
                                                                >
                                                                <FaArrowRight/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                    }
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
        </>
    )
}