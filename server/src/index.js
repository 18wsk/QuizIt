import express from 'express';
import cors from 'cors';
import { generateQuiz } from './openAI/index.js'

const port = 5000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this line to parse JSON data

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});

app.post('/', async (req, res) => {
    try {
        const questions = await generateQuiz(req.body.quizTopic);
        const formattedQuestions = JSON.parse(questions);
        // Send a 200 status with the formatted questions as JSON
        res.status(200).json({ questions: formattedQuestions.questions });
    } catch (error) {
        console.error("Error:", error);
        // Send a 500 status in case of an error
        res.status(500).json({ error: "Internal Server Error" });
    }
});
