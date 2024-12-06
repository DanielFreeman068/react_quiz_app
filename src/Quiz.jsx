import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Quiz = () => {
//array of objects to store all of my questions
const quizQuestions = [
    { question: "Which country has won the most FIFA World Cups?", choices: ["Brazil", "Germany", "Italy", "Argentina"], correctAnswer: "Brazil" },
    { question: "Who is known as the 'King of Soccer'?", choices: ["Cristiano Ronaldo", "Lionel Messi", "Pelé", "Diego Maradona"], correctAnswer: "Pelé" },
    { question: "What is the standard length of a soccer match?", choices: ["60 minutes", "70 minutes", "90 minutes", "120 minutes"], correctAnswer: "90 minutes" },
    { question: "Which player has scored the most goals in FIFA World Cup history?", choices: ["Miroslav Klose", "Pelé", "Ronaldo Nazário", "Lionel Messi"], correctAnswer: "Miroslav Klose" },
    { question: "What is the official size of a soccer ball used in professional matches?", choices: ["Size 3", "Size 4", "Size 5", "Size 6"], correctAnswer: "Size 5" },
    { question: "In which year was the first FIFA World Cup held?", choices: ["1928", "1930", "1934", "1942"], correctAnswer: "1930" },
    { question: "Which country hosted the 2018 FIFA World Cup?", choices: ["Brazil", "Russia", "Germany", "South Africa"], correctAnswer: "Russia" },
    { question: "What is the nickname of the Italian national soccer team?", choices: ["La Roja", "Azzurri", "Les Bleus", "Three Lions"], correctAnswer: "Azzurri" },
    { question: "What is the term for three goals scored by a player in a single match?", choices: ["Double", "Hat-trick", "Brace", "Triple"], correctAnswer: "Hat-trick" },
    { question: "Which country won the first FIFA Women's World Cup?", choices: ["United States", "Germany", "Norway", "Japan"], correctAnswer: "United States" },
    { question: "What does VAR stand for in soccer?", choices: ["Video Assistant Referee", "Virtual Action Replay", "Video Analysis Report", "Video Athletic Review"], correctAnswer: "Video Assistant Referee" },
    { question: "Which club is known as 'The Red Devils'?", choices: ["Liverpool", "Manchester United", "Bayern Munich", "AC Milan"], correctAnswer: "Manchester United" },
    { question: "Who is the all-time top scorer in the UEFA Champions League?", choices: ["Cristiano Ronaldo", "Lionel Messi", "Robert Lewandowski", "Raúl"], correctAnswer: "Cristiano Ronaldo" },
    { question: "What is the name of the trophy awarded to the Premier League champions?", choices: ["The Golden Cup", "The FA Cup", "The Premier League Trophy", "The Silver Ball"], correctAnswer: "The Premier League Trophy" },
    { question: "Which country is famous for the soccer club FC Barcelona?", choices: ["Italy", "Spain", "Argentina", "France"], correctAnswer: "Spain" },
    { question: "Which position is responsible for preventing goals in soccer?", choices: ["Forward", "Midfielder", "Defender", "Goalkeeper"], correctAnswer: "Goalkeeper" },
    { question: "Which stadium is known as the home of Real Madrid?", choices: ["Camp Nou", "Santiago Bernabéu", "Old Trafford", "San Siro"], correctAnswer: "Santiago Bernabéu" },
    { question: "Who is known for the 'Hand of God' goal in the 1986 FIFA World Cup?", choices: ["Diego Maradona", "Lionel Messi", "Pelé", "Zinedine Zidane"], correctAnswer: "Diego Maradona" },
    { question: "Which country won the 2022 FIFA World Cup?", choices: ["France", "Brazil", "Argentina", "Germany"], correctAnswer: "Argentina" },
    { question: "What is the maximum number of players allowed on the field for one team during a match?", choices: ["9", "10", "11", "12"], correctAnswer: "11" }
];
//sets all my needed useStates and variables
const bonusQuestion = { question: "What is the square root of 144?", choices: ["10", "12", "14", "16"], correctAnswer: "12" };
const [currentQuestion, setCurrentQuestion] = useState(0);
const [selectedAnswer, setSelectedAnswer] = useState(null);
const [score, setScore] = useState(0);
const [showFeedback, setShowFeedback] = useState(false);
const [isCorrect, setIsCorrect] = useState(false);
const [quizCompleted, setQuizCompleted] = useState(false);
const [showBonus, setShowBonus] = useState(false);
//takes in the user's answer as a parameter and checks it to the correct answer followed by adding or subtracting to your score based on the outcome
const handleAnswer = (answer) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    // Determine the correct answer
    const correctAnswer = showBonus ? bonusQuestion.correctAnswer : quizQuestions[currentQuestion].correctAnswer;
    const correct = answer === correctAnswer;
    setIsCorrect(correct);
    // Score calculation for answerrs
    setScore(prev => {
    if (showBonus) {
        return correct ? prev + 2 : prev;
    } else {
        return correct ? prev + 1 : prev -1;
    }
    });
    setShowFeedback(true);
};
//checks what question youre on to render the next question, bonus question, or the end score page
const handleNextQuestion = () => {
    if (!showFeedback) return;
    if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
    } else if (!showBonus) {
        setShowBonus(true);
    } else {
        setQuizCompleted(true);
    }
    setSelectedAnswer(null);
    setShowFeedback(false);
};
//resets all useStates
const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowFeedback(false);
    setQuizCompleted(false);
    setShowBonus(false);
};

const renderQuizContent = () => {
    //if the quiz is done render the end score page with restart button
    if (quizCompleted) {
        return (
            <div className="quiz-completed-container">
                <h2 className="quiz-completed-title">Quiz Completed!</h2>
                <p className="quiz-completed-score">Your Total Score: {score} / {quizQuestions.length}</p>
                <button onClick={restartQuiz} className="quiz-restart-btn">
                    Restart Quiz
                </button>
            </div>
        );
    }

    const currentQuizQuestion = showBonus ? bonusQuestion : quizQuestions[currentQuestion];

    return (
    <>
    <button className="quiz-exit-btn">
        <a href="/">Quit</a>
    </button>
    <div className="score">
        {score} / {quizQuestions.length}
    </div>
    {/* if the condition before the && is true then the feedback will be rendered */}
    {showFeedback && (
        <div className={`quiz-feedback ${isCorrect ? 'quiz-feedback-correct' : 'quiz-feedback-incorrect'}`}>
            {isCorrect ? <CheckCircle className="mr-2" /> : <AlertCircle className="mr-2" />}
            {isCorrect ? "Correct!" : `Incorrect. The correct answer is ${currentQuizQuestion.correctAnswer}.`}
        </div>
    )}
    <div className="quiz-card">
        <div className="quiz-header">
            <h2 className="quiz-title">
                {/* renders questions number or bonus text if bonus */}
                {showBonus ? "Bonus Question!" : `Question ${currentQuestion + 1}`}
            </h2>
            {/* current question displayed */}
            <p className="quiz-question">{currentQuizQuestion.question}</p>
        </div>
    </div>
    <div className="quiz-choices-container">
        {currentQuizQuestion.choices.map((choice) => (
            // map() displays all choices correlating to the question and uses ternary statements to add classNames in order to ensure the correct answer lights up green and the wrong one lights up red
            <button key={choice} onClick={() => handleAnswer(choice)} disabled={showFeedback} className={`quiz-choice-btn
                ${showFeedback && choice === currentQuizQuestion.correctAnswer ? 'quiz-choice-btn-correct' : ''}
                ${showFeedback && selectedAnswer === choice && !isCorrect ? 'quiz-choice-btn-incorrect' : ''}
                ${showFeedback ? 'quiz-choice-btn-disabled' : ''}
            `}>
                {choice}
            </button>
        ))}
    </div>
    <div className="quiz-footer">
        {/* since showFeedback is true now, disabled becomes the opposite (false) allowing you to hit next question */}
        <button onClick={handleNextQuestion} disabled={!showFeedback} className={`quiz-next-btn ${showFeedback ? 'quiz-next-btn-active' : 'quiz-next-btn-disabled'}`}>
            {/* ternary to check if the next question it a bonus or just regular */}
            {currentQuestion < quizQuestions.length - 1 ? "Next Question" : (showBonus ? "Finish Quiz" : "Bonus Question")}
        </button>
    </div>
    </>
)};
// renders the renderQuizContent function
return(
    <div className="quiz-app-container">
        <div className="quiz-app-wrapper">{renderQuizContent()}</div>
    </div>
)
};

export default Quiz;