import {useState, useEffect} from 'react'

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const questions = [
        { id: 1, question: 'What is the capital of France?', answer: 'Paris' },
        { id: 2, question: 'Who is the current Prime Minister of the United Kingdom?', answer: 'Theresa May' },
        { id: 3, question: 'What is the largest ocean in the world?', answer: 'Pacific Ocean' },
        // Add more questions as needed
    ];
    return (
        <>
            <h1>Question {currentQuestion}</h1>
        </>
    );
}

export default Quiz;
