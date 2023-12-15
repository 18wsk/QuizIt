import mongoose from 'mongoose';

export const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://willkennedy2000:Wkennedy%232022@swiftchat.qhtbm9k.mongodb.net/QuizIt', {
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
const UserSchema = new mongoose.Schema({
    id: { type: String, default: null },
    username: { type: String, default: null },
    currentScore: Number,
})
const QuizSchema = new mongoose.Schema({
    id: { type: String, default: null },
    users: [UserSchema],
    questions: [QuestionSchema],
    currentUser: { type: UserSchema, default: null },
    currentQuestion: Number,
    currentAnswer: { type: String, default: null },
    darkMode: Boolean,
});
// CREATE MONGOOSE MODEL
const Question = mongoose.model('Question', QuestionSchema);
const User = mongoose.model('User', UserSchema);
export const Quiz = mongoose.model('Quiz', QuizSchema);
