import React from 'react';

const Resume = () => {
  return (
    <div>
      <h1>My Resume</h1>
      <iframe
        src="/resume.pdf"
        width="100%"
        height="600px"
        title="Resume"
      >
        Your browser does not support iframes
      </iframe>
    </div>
  );
};

export default Resume;
