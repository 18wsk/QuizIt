import * as dotenv from 'dotenv';
import { OpenAI } from "openai";

dotenv.config();

export const generateQuiz = async (quizTopic) => {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        // create the necessary dependencies to enitiate client-->assistant connection
        const assistant = await openai.beta.assistants.retrieve('asst_UAxZyMjiSBHXgHz7O081AWOm');
        const thread = await openai.beta.threads.create();
        await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: quizTopic
        });
        // execute the dependencies
        const run = await openai.beta.threads.runs.create(thread.id, { 
            assistant_id: assistant.id,
        });
        // get the status --> likely "queued"
        let runStatus = await openai.beta.threads.runs.retrieve(
            thread.id, run.id
        );
        // repeatedly fetch until completed state --> no streaming whyyy openAI :(
        while (runStatus.status !== "completed") {
            console.log("Checking...")
            await new Promise((resolve) => setTimeout(resolve, 2000));
            runStatus =  await openai.beta.threads.runs.retrieve(thread.id, run.id);
        }
        // get the messages --> and get the latest assistant reply
        const messages = await openai.beta.threads.messages.list(thread.id)
        const lastMessageForRun = messages.data.filter((message) => message.run_id === run.id && message.role === "assistant").pop();
        // log status in terminal and return value
        if (lastMessageForRun) {
            console.log("!!! DONE !!!")
            return lastMessageForRun.content[0].text.value
        } else {
            return { questions: [] }
        }

    } catch(err) {
        console.log("ERROR: ", err)
        return { 'questions': [] }
    }

}