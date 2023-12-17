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


// API ROUTES 
app.post('/generate-quiz', async (req, res) => {
    console.log("Generating Quiz!", req.body);
    const questions = await generateQuiz(req.body.quizTopic);
    const formattedQuestions = JSON.parse(questions);
    // // store info in db
    const newQuiz = new Quiz({
        id: req.body.quizId,
        topic: req.body.quizTopic,
        questions: formattedQuestions.questions
    });
    try {
        const savedQuiz = await newQuiz.save();
        console.log('!!!!!!! Quiz saved successfully !!!!!!!!!');
        res.status(200).json({ questions: savedQuiz.questions });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/get-quiz', async (req, res) => {
    console.log("Finding Quiz!");
    try {
        const quizIdToFind = req.query.quizId; 
        console.log(quizIdToFind)
        // Find a quiz by ID using promises
        const quiz = await Quiz.findOne({ id: quizIdToFind });
        if (quiz) {
            console.log('Found Quiz:', quiz);
            res.status(200).json({ quiz });
        } else {
            console.log('Quiz not found');
            res.status(404).json({ error: "QUIZ NOT FOUND" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "CANNOT CONNECT" });
    }
});