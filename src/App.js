import React, { useState, useEffect } from 'react';
import './App.css';
import csQuestions from './mock/computer_science.json';
import logicalQuestions from './mock/logic_reasoning.json';
import quantQuestions from './mock/quant_aptitude.json';

const categoryData = {
  computer_science: csQuestions,
  logical: logicalQuestions,
  quantitative_aptitude: quantQuestions,
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  const currentCategoryQuestions = selectedCategory ? categoryData[selectedCategory] : [];
  const currentQuestion = currentCategoryQuestions[currentQuestionIndex];

  const handleAnswer = (selectedOption) => {
    if (!currentQuestion) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([...answers, {
      question: currentQuestion.question,
      selectedOption,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
    }]);

    if (currentQuestionIndex < currentCategoryQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsFinished(false);
    setAnswers([]);
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsFinished(false);
    setSelectedCategory('');
    setAnswers([]);
  };

  const getFeedbackMessage = () => {
    const accuracy = (score / currentCategoryQuestions.length) * 100;

    if (accuracy === 100) return "🏆 Excellent! You answered all questions correctly!";
    if (accuracy >= 80) return "🎯 Great job! Just a little more to reach perfection.";
    if (accuracy >= 60) return "👍 Good attempt. Review the incorrect answers to improve.";
    return "📘 Keep practicing! Consistency is the key to improvement.";
  };

  useEffect(() => {
    if (currentQuestionIndex >= currentCategoryQuestions.length) {
      setIsFinished(true);
    }
  }, [currentQuestionIndex, currentCategoryQuestions.length]);

  return (
    <div className="App">
      <h1>Quiz Game</h1>

      {!selectedCategory && (
        <div className="card category-card">
          <h2>Select a Category</h2>
          <select onChange={handleCategoryChange}>
            <option value="">-- Choose Category --</option>
            <option value="computer_science">Computer Science</option>
            <option value="logical">Logical Reasoning</option>
            <option value="quantitative_aptitude">Quantitative Aptitude</option>
          </select>
        </div>
      )}

      {selectedCategory && !isFinished && currentQuestion && (
        <div className="card question-card">
          <h2>{currentQuestion.question}</h2>
          <div className="options-grid">
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="option-card" onClick={() => handleAnswer(option)}>
                <p>{option}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isFinished && (
        <div className="card result-card">
          <h2>Quiz Finished!</h2>
          <p><strong>Your Score:</strong> {score} / {currentCategoryQuestions.length}</p>
          <p><strong>Correct Answers:</strong> {score}</p>
          <p><strong>Incorrect Answers:</strong> {currentCategoryQuestions.length - score}</p>
          <p><strong>Accuracy:</strong> {(score / currentCategoryQuestions.length * 100).toFixed(2)}%</p>
          <p><strong>Feedback:</strong> {getFeedbackMessage()}</p>

          <h3>Answer Review:</h3>
          <ul>
            {answers.map((ans, index) => (
              <li key={index}>
                <strong>Q:</strong> {ans.question}<br />
                <span style={{ color: ans.isCorrect ? 'green' : 'red' }}>
                  Your Answer: {ans.selectedOption} {ans.isCorrect ? '✔' : `✘ (Correct: ${ans.correctAnswer})`}
                </span>
              </li>
            ))}
          </ul>

          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default App;
