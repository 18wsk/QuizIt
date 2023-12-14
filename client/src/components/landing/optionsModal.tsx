import { Dialog, Disclosure, Switch, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { MdOutlineClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoMenuOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../../store/quizSlice';
import { RootState } from '../../store/store';

export const OptionsModal = ({ nav } : { nav: boolean }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const dispatch = useDispatch();
    const darkMode = useSelector((state: RootState) => state.quiz.darkMode);

    const toggleDark = () => {
        dispatch(setDarkMode(!darkMode))
    }
    
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    
    const OptionsRow = () => {
        return (
            <div className="w-full flex flex-cols-2 border-b border-primary">
                <div className="w-full h-full font-roboto text-white py-4 text-xl flex flex-col items-start justify-center">Dark Theme</div>
                <div className="w-full h-full py-4 text-xl flex flex-col items-end  justify-center">
                    <Switch
                        checked={darkMode}
                        onChange={() => toggleDark()}
                        className={`${darkMode ? 'bg-primary' : 'bg-black/20'}
                        relative inline-flex h-[24px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                    >
                        <span className="sr-only">Use setting</span>
                        <span
                            aria-hidden="true"
                            className={`${darkMode ? 'translate-x-[1.55rem]' : 'translate-x-0'}
                                pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-500 ease-in-out`}
                        />
                    </Switch>
                </div>
            </div>
        )
    }

    return (
        <>
        <div className="flex items-center justify-center">
            { nav 
                ? 
                    <button
                        type="button"
                        onClick={openModal}
                        className='outline-none bg-transparent text-white border-primary border-[1px] h-[32px] w-[32px] rounded-lg flex items-center justify-center font-roboto hover:shadow-md hover:scale-110 hover:contrast-125'
                    >
                        <IoMenuOutline size={32} />
                    </button>
                :
                <button
                    type="button"
                    onClick={openModal}
                    className='outline-none bg-transparent text-white border-primary border-[1px] h-[48px] w-[150px] rounded-full flex items-center justify-center font-roboto hover:shadow-md hover:scale-110 hover:contrast-125'
                >
                    Options
                </button>
            }
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
                            <Dialog.Panel className="w-[500px] h-[640px] border-primary border-[1px] transform rounded-2xl bg-primary bg-opacity-30 backdrop-filter backdrop-blur-xl p-6 text-left align-middle shadow-xl transition-all overflow-hidden">
                                <Dialog.Title
                                    as="h3"
                                    className="text-2xl font-medium font-libre text-center text-white"
                                >
                                    OPTIONS
                                    <button className='absolute top-4 right-8 text-white text-xl hover:bg-primary rounded-lg p-1' onClick={closeModal}>
                                        <MdOutlineClose />
                                    </button>
                                </Dialog.Title>
                                <div className="w-full h-full p-4 flex flex-col items-center justify-evenly">
                                    <OptionsRow/>
                                    <div className="w-full flex flex-cols-2 border-b border-primary">
                                        <div className="w-full h-full font-roboto text-white py-4 text-xl flex flex-col items-start justify-center">Report a Bug</div>
                                        <div className="w-full h-fulltext-xl flex flex-col items-end  justify-center">
                                            <Link to="mailto:will.stephen.kennedy@gmail.com" className="text-white font-roboto text-md underline underline-thickness-2">Email</Link>
                                        </div>
                                    </div>
                                    <Disclosure>
                                        <div className="w-full flex flex-cols-2 border-b border-primary">
                                            <div className="w-full h-full font-roboto text-white py-4 text-xl flex flex-col items-start justify-center">Questions</div>
                                            <div className="w-full h-fulltext-xl flex flex-col items-end  justify-center">
                                                <Disclosure.Button className="text-white font-roboto text-md underline underline-thickness-2">
                                                    FAQ
                                                </Disclosure.Button>
                                            </div>
                                        </div>
                                    <Disclosure.Panel className="text-white w-full h-fit overflow-y-scroll scrollbar-hide">
                                        <div className="w-full h-fit grid grid-cols-2 items-center justify-between ">
                                            <div className="w-full h-fit text-xs font-fira font-bold text-white flex items-center justify-center">
                                                What is Quiz It?
                                            </div>
                                            <div className="w-full h-fit text-xs font-fira font-light p-2">
                                                Quiz It is a fun quiz game developed by William Kennedy, a recent computer engineering graduate from 
                                                Queen's University. In Quiz It, you can choose a topic, and the game generates a challenging quiz using OpenAI 
                                                technology. It's a great way to test your knowledge and challenge your friends on any subject.
                                            </div>
                                            <div className="w-full h-fit text-xs font-fira font-bold text-white flex items-center justify-center">
                                                Can I suggest new topics for quizzes in Quiz It?
                                            </div>
                                            <div className="w-full h-fit text-xs font-fira font-light p-2">
                                                While the current version may not have a direct suggestion feature, we appreciate user feedback! 
                                                Feel free to reach out to us with your topic suggestions, and we'll consider adding them in future updates.
                                            </div>
                                            <div className="w-full h-fit text-xs font-fira font-bold text-white flex items-center justify-center">
                                                Can I challenge my friends to play Quiz It?
                                            </div>
                                            <div className="w-full h-fit text-xs font-fira font-light p-2">
                                                Yes, you can! Quiz It allows you to share your quiz and challenge your friends to see who can score the highest. 
                                                It adds a competitive and social aspect to the game.
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                    </Disclosure>
                                    <div className="w-full h-[32px] flex flex-cols-2 px-4">
                                        <div className="text-sm text-white font-libra w-full flex items-center justify-start">© QuizIt By William Kennedy</div>
                                        <div className="text-sm text-white font-libra w-fit flex items-center justify-end">#007</div>
                                    </div>
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
