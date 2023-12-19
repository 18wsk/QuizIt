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
    try {
        // Validate input data
        const { quizId, quizTopic } = req.body;
        if (!quizId || !quizTopic) {
            throw new Error("Invalid request. Missing quizId or quizTopic.");
        }
        // Generate quiz questions
        const questions = await generateQuiz(quizTopic);
        // Store quiz info in the database
        try {
            const newQuiz = new Quiz({
                id: quizId,
                topic: quizTopic,
                questions: questions,
            });
            const savedQuiz = await newQuiz.save();
            console.log('✔️ Quiz saved successfully ✔️');
            console.log(savedQuiz.questions)
            res.status(200).json({ questions: savedQuiz.questions });
        } catch (dbError) {
            console.error("❌ Database Error:", dbError);
            res.status(500).json({ error: "Error saving quiz to the database.", details: dbError.message });
        }
    } catch (error) {
        console.error("❌ Error:", error);
        if (error.message === "There was an error in the prompt input.") res.status(400).json({ error: "Please Try Another Topic" });
        else res.status(400).json({ error: error.message });
    }
});

// API ROUTE to get a quiz by ID
app.get('/get-quiz', async (req, res) => {
    console.log("Finding Quiz!");
    try {
        // Validate input data
        const quizIdToFind = req.query.quizId;
        if (!quizIdToFind) {
            throw new Error("Invalid request. Missing quizId in query parameters.");
        }
        // Find a quiz by ID
        const quiz = await Quiz.findOne({ id: quizIdToFind });
        if (quiz) {
            res.status(200).json({ quiz });
        } else {
            res.status(404).json({ error: "QUIZ NOT FOUND" });
        }
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: "INTERNAL SERVER ERROR", details: error.message });
    }
});
