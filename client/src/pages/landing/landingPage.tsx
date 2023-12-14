import logo from "../../assets/logo.png";
import { motion } from 'framer-motion';
import { OptionsModal } from "../../components/landing/optionsModal";
import { PlayModal } from "../../components/landing/playModal";
import { useEffect } from 'react';
import { setDarkMode } from '../../store/quizSlice';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

//service_15tio6i

const LandingPage = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state: RootState) => state.quiz.darkMode);

    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        dispatch(setDarkMode(prefersDarkMode));
    }, [dispatch]);

    return (
        <div className={`${darkMode ? "bg-dark-primary" : "bg-gradient-to-r from-secondary to-primary"} w-screen h-screen flex flex-col items-center justify-center`}>
            <motion.div
                className="w-1/2 h-full flex flex-col items-center justify-center"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="h-fit w-full flex items-center justify-center baackground-red-300">
                    <img src={logo} className="h-[100px] w-[100px]" alt="Logo" />
                </div>
                <h1 className="text-5xl font-extrbold font-libre h-[60px] text-white">QuizIt</h1>
                <h2 className="text-xl font-roboto text-center py-2 text-white">Create Compete Connect with AI-Crafted Challenges!</h2>
                <div className="w-full h-fit flex flex-cols-2 items-center justify-center py-8 gap-x-4">
                    <PlayModal />
                    <OptionsModal nav={false}/>
                </div>
                <div className='w-full h-fit flex flex-col items-center justify-center'>
                    <p className='font-roboto font-light text-white'>v.0.0</p>
                    <p className='font-roboto font-light text-white'>By William Kennedy</p>
                </div>
            </motion.div>
        </div>
    ); 
}

export default LandingPage;
