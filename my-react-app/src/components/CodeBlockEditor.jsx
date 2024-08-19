import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-dark.css';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '800px',
  marginTop: '20px',
  padding: '10px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const editorStyle = {
  fontFamily: '"Fira code", "Fira Mono", monospace',
  fontSize: '12px',
  border: '1px solid #ddd', // Add border to the editor
  borderRadius: '4px', // Rounded corners
  width: '100%',
  minHeight: '200px', // Ensure there's enough space for the editor
};

function CodeBlockEditor(props) {
  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center' }}>Code Editor</h2>
      {props.role === 'student' ? (
        <Editor
          value={props.code || ''} // Always display the editor, even if there's no code
          onValueChange={props.handleCodeChange}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={editorStyle}
        />
      ) : (
        <pre style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: '12px', width: '100%' }}>
          <code dangerouslySetInnerHTML={{ __html: highlight(props.code, languages.js) }} />
        </pre>
      )}
    </div>
  );
}

export default CodeBlockEditor;
