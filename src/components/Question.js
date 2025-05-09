// components/Question.js
import React from 'react';

const Question = ({ data, onAnswer }) => {
  const { question, image, options } = data;

  return (
    <div className="border p-4 rounded shadow mt-4">
      <h3 className="text-xl font-semibold mb-2">{question}</h3>
      {image && <img src={image} alt="question" className="mb-4 w-full rounded" />}
      <div className="grid gap-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(opt)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;