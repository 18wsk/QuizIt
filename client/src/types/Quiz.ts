import { Question } from "./Question";
import { User } from "./User";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface Quiz {
    id: string | null;
    users: User[];
    questions: Question[];
    currentUser: User | null;
    currentQuestion: number;
    currentAnswer: string | null;
    darkMode: boolean;
}