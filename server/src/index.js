import express from 'express';
import cors from 'cors';
import { generateQuiz } from './openAI/index.js';
import { connectToDB, Quiz } from './db/index.js';

const port = 5000;

const app = express();
connectToDB();


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this line to parse JSON data

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});

app.post('/generate/quiz', async (req, res) => {
    console.log("Generating Quiz!");
    try {
        const questions = await generateQuiz(req.body.quizTopic);
        const formattedQuestions = JSON.parse(questions);
        
        // store info in db
        const newQuiz = new Quiz({
            id: req.body.id,
            users: [],
            questions: formattedQuestions,
            currentUser: null,
            currentQuestion: 0,
            currentAnswer: null,
            darkmode: false
        });
        
        newQuiz.save((err, savedQuiz) => {
            if (err) {
                console.error('Error saving quiz:', err);
                res.status(500).json({ error: "Internal Server Error" });
            } else {
                console.log('Quiz saved successfully:', savedQuiz);
                res.status(200).json({ questions: formattedQuestions });
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get('/get/quiz', async (req, res) => {
    console.log("Generating Quiz!");
    try {
        const quizIdToFind = 'yourQuizId'; // Replace with the actual ID you want to find
        // Find a quiz by ID
        Quiz.findById(quizIdToFind, (err, quiz) => {
            if (err) {
                console.error('Error finding quiz:', err);
                res.status(500).json({ error: "CANNOT FIND QUIZ" });
            } else if (quiz) {
                console.log('Found Quiz:', quiz);
            } else {
                console.log('Quiz not found');
                res.status(500).json({ error: "QUIZ NOT FOUND" });
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "CANNOT CONNECT" });
    }
});
