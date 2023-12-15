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
    const timeoutMilliseconds = 5000; // Set the timeout to 5 seconds (adjust as needed)

    // Wrap the generateQuiz function in a promise
    const generateQuizPromise = new Promise(async (resolve, reject) => {
        try {
            const questions = await generateQuiz(req.body.quizTopic);
            const formattedQuestions = JSON.parse(questions);
            resolve(formattedQuestions.questions);
        } catch (error) {
            console.error("Error:", error);
            reject(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // Set a timeout for the promise
    const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => resolve({ error: "Request timed out" }), timeoutMilliseconds);
    });

    // Race between the two promises
    Promise.race([generateQuizPromise, timeoutPromise])
        .then((result) => {
            if (result.error) {
                // Send a 500 status in case of a timeout
                res.status(500).json({ error: result.error });
            } else {
                // Send a 200 status with the formatted questions as JSON
                res.status(200).json({ questions: result });
            }
        })
        .catch((error) => {
            // Handle unexpected errors
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
});
