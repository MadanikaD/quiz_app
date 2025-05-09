import React from 'react';

const Review = ({ answers, score, total, onRetry }) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Your Score: {score} / {total}</h2>
      <button onClick={onRetry} className="mt-4 bg-green-500 text-white py-2 px-4 rounded">Retry</button>
      <div className="mt-6 text-left">
        {answers.map((q, idx) => (
          <div key={idx} className="mb-4 p-2 border rounded">
            <p className="font-medium">{q.question}</p>
            <p>Your answer: <span className={q.selected === q.correctAnswer ? 'text-green-600' : 'text-red-600'}>{q.selected || 'No Answer'}</span></p>
            <p>Correct answer: {q.correctAnswer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;