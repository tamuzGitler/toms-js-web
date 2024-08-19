import React from 'react';

function CodeBlockTaskDescription(props) {

  // Inline styles for the outer container
  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f9f9f9', // Light background for the container
    borderRadius: '8px', // Rounded corners
    border: '1px solid #ddd', // Subtle border
    fontFamily: 'Arial, sans-serif',
    margin: '20px auto', // Center container horizontally and add margin at the top and bottom
    maxWidth: '800px', // Set a max width to prevent it from stretching too wide
    textAlign: 'center', // Center align text
  };

  // Inline styles for the section title
  const sectionTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px', // Space below the title
  };

  // Inline styles for the text content
  const textContentStyle = {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '20px', // Space below the text
  };

  // Inline styles for the comment
  const commentStyle = {
    fontSize: '0.9rem',
    color: '#777',
    fontStyle: 'italic',
  };

  return (
    <div style={containerStyle}>
      <div>
        <div style={sectionTitleStyle}>Description</div>
        <p style={textContentStyle}>{props.description}</p>
      </div>
      <div>
        <div style={sectionTitleStyle}>Task</div>
        <p style={textContentStyle}>{props.task}</p>
      </div>
      <div style={commentStyle}>
        # Important information: make sure you delete all the comments in the code!
      </div>
    </div>
  );
}

export default CodeBlockTaskDescription;
