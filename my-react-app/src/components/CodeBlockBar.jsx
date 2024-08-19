import React from 'react';

function CodeBlockBar(props) {

  // Inline styles for the container
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f0f2f5', // Light background color
    borderBottom: '2px solid #ddd', // Subtle border
    fontFamily: 'Arial, sans-serif',
  };

  // Inline styles for the role indicator
  const roleStyle = {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#ff5722',
    padding: '5px 10px',
    borderRadius: '5px',
    backgroundColor: '#fff3e0',
    border: '1px solid #ff5722',
    marginRight: 'auto', // Push role to the left
  };

  // Inline styles for the title
  const titleStyle = {
    fontSize: '2rem', // Larger font size for the title
    textAlign: 'center',
    flexGrow: 1, // Center the title
    margin: '0 20px', // Add space on the sides
    fontWeight: 'bold',
  };

  // Inline styles for the student counter
  const studentCounterStyle = {
    fontSize: '1rem',
    color: '#4caf50', // Green color for the student counter
    marginLeft: 'auto', // Push student counter to the right
  };

  return (
    <div style={containerStyle}>
      <div style={roleStyle}>
        {props.role}
      </div>
      <div style={titleStyle}>
        {props.title}
      </div>
      <div style={studentCounterStyle}>
        Students in room: {props.studentCounter}
      </div>
    </div>
  );
}

export default CodeBlockBar;
