
import GameOverComponent from "../gameOverComponent";
import { MultipleChoiceQuestion } from "./multipleChoiceQuestion";
import { FillInTheBlankQuestion } from "./fillInTheBlankQuestion";
import { Question } from "../../types/Question";

const QuestionComponent = ({
    questions,
    currentQuestionIdx
}:{
    questions: Question[],
    currentQuestionIdx: number
}) => {
    const currentQuestion = questions[currentQuestionIdx];
    console.log(currentQuestion)
    return (
        <> 
        { currentQuestionIdx <= 9 
        ? (currentQuestion?.mc 
            ? (
            <MultipleChoiceQuestion question={currentQuestion} />
            ) : (
            <FillInTheBlankQuestion  question={currentQuestion} />
            ))
        : <GameOverComponent/>
        }
        </>
    )
}

export default QuestionComponent