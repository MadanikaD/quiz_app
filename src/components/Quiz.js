import React, { useEffect, useState } from 'react';
import Question from './Question';
import Review from './Review';
import CategorySelector from './CategorySelector';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [category, setCategory] = useState('general');
  const [timer, setTimer] = useState(15);

  const fetchQuestions = async () => {
    const res = await fetch(`/mock/${category}.json`); // mock file in public folder
    const data = await res.json();
    setQuestions(data);
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setUserAnswers([]);
    setTimer(15);
  };

  useEffect(() => {
    fetchQuestions();
  }, [category]);

  useEffect(() => {
    if (timer <= 0) handleAnswer(null);
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleAnswer = (selected) => {
    const current = questions[currentQ];
    const isCorrect = selected === current.correctAnswer;
    if (isCorrect) setScore(prev => prev + 1);
    setUserAnswers(prev => [...prev, { ...current, selected }]);

    const next = currentQ + 1;
    if (next < questions.length) {
      setCurrentQ(next);
      setTimer(15);
    } else {
      setShowResult(true);
    }
  };

  if (!questions.length) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <CategorySelector selected={category} onSelect={setCategory} />
      {showResult ? (
        <Review answers={userAnswers} score={score} total={questions.length} onRetry={fetchQuestions} />
      ) : (
        <>
          <p className="text-right text-sm">Time left: {timer}s</p>
          <Question data={questions[currentQ]} onAnswer={handleAnswer} />
        </>
      )}
    </div>
  );
};

export default Quiz;

