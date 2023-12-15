
import GameOverComponent from "../gameOverComponent";
import { MultipleChoiceQuestion } from "./multipleChoiceQuestion";
import { FillInTheBlankQuestion } from "./fillInTheBlankQuestion";
import { Question } from "../../types/Question";

const QuestionComponent = ({
    questions,
    currentQuestionIdx,
    isShowing
}:{
    questions: Question[],
    currentQuestionIdx: number,
    isShowing: boolean
}) => {
    const currentQuestion = questions[currentQuestionIdx];
    return (
        <> 
        { currentQuestionIdx <= 9 
            ? (currentQuestion?.mc 
                ? (
                <MultipleChoiceQuestion question={currentQuestion} isShowing={isShowing}/>
                ) : (
                <FillInTheBlankQuestion  question={currentQuestion} isShowing={isShowing} />
                ))
            : <GameOverComponent/>
        }
        </>
    )
}

export default QuestionComponent