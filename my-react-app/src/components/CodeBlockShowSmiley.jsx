import React from 'react';

const smileyStyle = {
  fontSize: '5rem',  
  textAlign: 'center',
  marginTop: '20px'   
};

function CodeBlockShowSmiley(props) {
  return (
    <>
      {props.showSmiley && (
        <div style={smileyStyle}>
          😊
        </div>
      )}
    </>
  );
}

export default CodeBlockShowSmiley;
