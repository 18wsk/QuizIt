import mongoose from 'mongoose';

export const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
      // Continue with your application logic here
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

// DEFINE TABLE SCHEMA ----------------------------------------------------------------

const QuestionSchema = new mongoose.Schema({
    question: String,
    mc: Boolean,
    options: [String],
    answer: String
});
const QuizSchema = new mongoose.Schema({
    id: { type: String, default: null },
    topic: String,
    questions: [QuestionSchema],
});
// CREATE MONGOOSE MODEL
const Question = mongoose.model('Question', QuestionSchema);
const User = mongoose.model('User', UserSchema);
export const Quiz = mongoose.model('Quiz', QuizSchema);
