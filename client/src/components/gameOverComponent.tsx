import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { Transition } from "@headlessui/react";
import { useState } from "react"
import { Link } from "react-router-dom";
import clsx from "clsx";

const GameOverComponent = () => {
  const currentUser = useSelector((state: RootState) => state.quiz.currentUser);

  const currentURL = window.location.href;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleShare = () => {
    navigator.clipboard.writeText(currentURL)
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  }

  return (
    <motion.div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-[32px] flex items-center justify-center pb-2">
        <Transition show={isOpen}>
          <Transition.Child
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 rotate-0 scale-100"
            leave="transform duration-200 transition ease-in-out"
            leaveFrom="opacity-100 rotate-0 scale-100 "
            leaveTo="opacity-0 scale-95 "
          >
            <h3
              className={
                clsx("w-fit h-[32px] p-2 rounded-lg text-center text-white text-sm",
                    "bg-secondary"
            )}>
              Copied: { currentURL}!
            </h3>
          </Transition.Child>
        </Transition>
      </div>
      <h1 className="w-full text-5xl font-roboto text-white text-center">GAME OVER.</h1>
      <div className="w-[400px] h-[200px] flex items-center justify-center">
          <Spline 
            scene="https://prod.spline.design/Bgz5xbVnZzyOfTc9/scene.splinecode" 
            className='className="w-[400px] h-[160px] flex items-center justify-center'
          />
      </div>
      <h2 className="w-fit text-2xl text-center font-libre text-white p-2  rounded-lg bg-primary/10"
        >
          SCORE: {currentUser?.currentScore}
      </h2>
      <div className="w-full h-fit flex flex-cols-2 items-center justify-evenly pt-12">
        <button
          type="button"
          onClick={() => handleShare()}
          className='h-[48px] w-[150px] rounded-lg flex items-center justify-center font-roboto hover:shadow-md 
          bg-primary text-white hover:shadow-white hover:scale-110 hover:contrast-125'
        >
          Share
        </button>
        <Link
          to="/"
          className='h-[48px] w-[150px] rounded-lg flex items-center justify-center font-roboto hover:shadow-md 
          bg-secondary text-white hover:shadow-white hover:scale-110 hover:contrast-125'
          >
            New Quiz
        </Link>
      </div>
    </motion.div>
  )
}

export default GameOverComponent