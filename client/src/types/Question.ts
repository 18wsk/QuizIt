
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface Question {
    question: string,
    mc: boolean,
    options?: string[],
    answer: string,
}

// Common properties for both question types
// interface BaseQuestion {
//   question: string;
// }

// // Multiple Choice Question
// interface MCQuestion extends BaseQuestion {
//   mc: true;
//   options: string[];
//   answerIndex: number; // Index of the correct option
// }

// // Fill-in-the-Blank Question
// interface FillInTheBlankQuestion extends BaseQuestion {
//   mc: false;
//   answer: string;
// }

// // Union type combining both question types
// export type Question = MCQuestion | FillInTheBlankQuestion;


