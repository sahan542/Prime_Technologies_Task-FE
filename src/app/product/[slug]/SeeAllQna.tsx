import React, { useState, useEffect } from 'react';

interface Qna {
  id: number;
  question: string;
  date: string;
}

const SeeAllQna = () => {
  const [qnas, setQnas] = useState<Qna[]>([]);

  useEffect(() => {
    // Simulate fetching Q&A
    const fetchedQnas: Qna[] = [
      { id: 1, question: 'What is the warranty period?', date: '2023-06-01' },
      { id: 2, question: 'Is this product compatible with XYZ?', date: '2023-06-05' },
    ];
    setQnas(fetchedQnas);
  }, []);

  return (
    <div className="all-qna">
      <h3>All Questions</h3>
      <ul className="space-y-4">
        {qnas.map((qna) => (
          <li key={qna.id} className="border-b py-2">
            <p>{qna.question}</p>
            <span className="text-sm text-gray-500">{qna.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeeAllQna;
