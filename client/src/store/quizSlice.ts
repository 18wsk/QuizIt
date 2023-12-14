import { createSlice } from "@reduxjs/toolkit";
import { Quiz } from "../types/Quiz";
import { v4 as uuidv4 } from 'uuid';
import { User } from "../types/User";
import { Question } from "../types/Question";


export const initialState: Quiz = {
    id: uuidv4().substring(0,4),
    users: [],
    currentQuestion: 0,
    questions: [],
    currentUser: {
        id: uuidv4(),
        username: null,
        currentScore: 0
    },
    currentAnswer: null,
    darkMode: true
};

export const QuizSlice = createSlice({
    name: "QuizSlice",
    initialState,
    reducers: {
        setCurrentUser:  (state, { payload }: { payload: User }) => {
            state.currentUser = payload;
        },
        updateUsername: (state, { payload }: { payload: string }) => {
            if ( state.currentUser ) state.currentUser.username = payload;
        },
        addUser: (state, { payload }: { payload: User }) => {
            state.users = [...state.users, payload]
        },
        setQuestions: (state, { payload }: { payload: Question[] }) => {
            state.questions = [...payload];
        },
        setCurrentQuestion: (state, { payload }: { payload: number }) => {
            state.currentQuestion = payload;
        },
        updateScore: (state) => {
            if ( state.currentUser ) state.currentUser.currentScore++;
        },
        setCurrentAnswer: (state, { payload }: { payload: string | null }) => {
            state.currentAnswer = payload
        },
        setDarkMode: (state, { payload }: { payload: boolean }) => {
            state.darkMode = payload;
        }
    }
})

export default QuizSlice.reducer;
export const { 
    setCurrentUser, 
    updateUsername, 
    addUser,
    setQuestions,
    setCurrentQuestion, 
    updateScore, 
    setCurrentAnswer, 
    setDarkMode 
} = QuizSlice.actions;