import * as dotenv from 'dotenv';
import { OpenAI } from "openai";

dotenv.config();

export const generateQuiz = async (quizTopic) => {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        // create the necessary dependencies to initiate client ---> assistant connection
        const assistant = await openai.beta.assistants.retrieve('asst_UAxZyMjiSBHXgHz7O081AWOm');
        const thread = await openai.beta.threads.create();
        await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: quizTopic
        });
        // Run the dependencies
        const run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistant.id,
        });
        // get the status --> likely "queued"
        let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
        // repeatedly fetch until completed state --> no streaming whyyy openAI :(
        while (runStatus.status !== "completed") {
            console.log("Checking . . .");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
        }
        // GET THE ASSISTANT RESPONSE --> and get the latest assistant reply
        const messages = await openai.beta.threads.messages.list(thread.id);
        if (!messages || !messages.data) throw new Error("Could Not Get Assistant Response")
        const assistantResponse = messages.data.filter((message) => message.run_id === run.id && message.role === "assistant").pop();
        
        // log status in terminal and return value
        if (assistantResponse) {
            console.log("!!! GENERATING RESPONSE !!!");
            const questions = JSON.parse(assistantResponse.content[0].text.value).questions
            if (questions.length < 10) {
                console.log("❌ FAILED: PROMPT ERROR ❌");
                throw new Error("PROMPT ERR");
            } else {
                console.log("✔️ DONE ✔️");
                return questions
            }
        } else {
            console.log("❌ FAILED: ASSISTANT RESPONSE ERROR ❌");
            throw new Error("ASSISTANT ERR");
        }
    } catch (err) {
        console.log("❌ FAILED: OpenAI ERROR ❌");
        throw new Error("OpenAI ERR");
    }
};
