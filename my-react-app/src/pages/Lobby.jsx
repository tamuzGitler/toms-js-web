import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import backgroundImage from '../assets/backgroundImage.png';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  width: '100%',
  height: '100vh', // Full viewport height
  padding: '20px',
  boxSizing: 'border-box',
  backgroundImage: `url(${backgroundImage})`, // Set the background image
  backgroundSize: 'cover', // Cover the entire container
  backgroundRepeat: 'no-repeat', // Do not repeat the image
  backgroundPosition: 'center center', // Center the image
};

const descriptionStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  fontSize: '1.1rem',
  lineHeight: '1.5',
  color: '#fff', // Adjust text color for readability on background
};

const buttonListStyle = {
  display: 'flex',
  flexWrap: 'wrap', // Allow buttons to wrap to the next line if necessary
  justifyContent: 'center',
  padding: '0',
  margin: '20px 0 0',
};

const buttonItemStyle = {
  margin: '10px',
};

const buttonStyle = {
  fontSize: '1rem',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const Lobby = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    fetch('/api/get_buttons_names/')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); 
        setCodeBlocks(data);
      })
      .catch(error => console.error('Error fetching code blocks:', error));
  }, []);

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#fff' }}>Choose code block</h1>
      <p style={descriptionStyle}>
        On this site, you’ll find a series of coding challenges to help you become a JavaScript master. 
        Start by selecting a code block from the "Choose code block" page. Each code block will take you 
        to a page where you can edit code.
        <br /><br />
        Tom, as the mentor, will provide guidance and review your code, while you, as a student, will 
        have the opportunity to experiment and learn. Your changes will be visible in real-time, and you 
        can see how many students are working alongside you. When you match the code to the provided 
        solution, a big smiley face will appear to celebrate your success!
      </p>
      <div style={buttonListStyle}>
        {codeBlocks.map(codeBlock => (
          <div key={codeBlock.code_block_id} style={buttonItemStyle}>
            <Link to={`/codeblock/${codeBlock.code_block_id}/`}>
              <button style={buttonStyle}>
                {codeBlock.title}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lobby;
