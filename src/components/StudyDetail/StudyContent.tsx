import React from 'react';

interface StudyContentProps {
  content: string;
}

const StudyContent: React.FC<StudyContentProps> = ({ content }) => {
  return (
    <div className="mt-8 mb-8">
      <p className="p-4 bg-white border-t border-b text-black">{content}</p>
    </div>
  );
};

export default StudyContent;
