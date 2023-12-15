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

app.get('/', () => {
    console.log("HELLO WORLD!");
})

app.post('/generate-quiz', async (req, res) => {
    console.log("Generating Quiz!");
    try {
        const questions = await generateQuiz(req.body.quizTopic);
        const formattedQuestions = JSON.parse(questions);
        res.status(200).json({ questions: formattedQuestions });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
