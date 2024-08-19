import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-dark.css';
import _ from 'lodash';
import CodeBlockBar from '../components/CodeBlockBar';
import CodeBlockTaskDescription from '../components/CodeBlockTaskDescription';
import CodeBlockEditor from '../components/CodeBlockEditor';
import CodeBlockShowSmiley from '../components/CodeBlockShowSmiley';
import backgroundImage from '../assets/backgroundImage.png'; // Import the background image

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100vh', // Full viewport height
  padding: '20px',
  boxSizing: 'border-box',
  backgroundImage: `url(${backgroundImage})`, // Set the background image
  backgroundSize: 'cover', // Cover the entire container
  backgroundRepeat: 'no-repeat', // Do not repeat the image
  backgroundPosition: 'center center', // Center the image
};

function CodeBlockPage() {
  const { codeBlockId } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [task, setTask] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState('');
  const [code, setCode] = useState('');
  const [studentCounter, setStudentCounter] = useState(0);
  const [userId, setUserId] = useState('');
  const [showSmiley, setShowSmiley] = useState(false);

  let socket;
  const debouncedEmitCodeUpdate = useCallback(
    _.debounce((newCode) => {
      socket.emit('code_updated', { 'code': newCode, 'code_block_id': codeBlockId });
    }, 500),
    [codeBlockId]
  );

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    debouncedEmitCodeUpdate(newCode);
  };

  useEffect(() => {
    setIsLoading(true);

    fetch(`/api/codeblocks/${codeBlockId}/`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
        setTask(data.task)
      })
      .catch((error) => {
        console.error('Error fetching code block data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    const storedUserId = sessionStorage.getItem('user_id');
    
    socket = io('https://web-production-63b2.up.railway.app', {
      query: { user_id: storedUserId },
      transports: ['websocket'] // Force WebSocket for better performance 

    });

    socket.on('store_user_id', (data) => {
      sessionStorage.setItem('user_id', data.user_id);
      setUserId(data.user_id);
      
      socket.emit('join_room', {
        'code_block_id': codeBlockId,
        'user_id': data.user_id
      });
    });

    socket.on('mentor_already_in_another_room', () => {
      alert(`Mentor is observing another room. Redirecting to lobby...`);
      sessionStorage.removeItem('user_id');
      setUserId('');
      navigate('/');
    });

    socket.on('initial_data', (data) => {
      setRole(data.role);
      setCode(data.code);
      setStudentCounter(data.studentCounter);
    });

    socket.on('student_count_update', (data) => {
      setStudentCounter(data.studentCounter);
    });

    socket.on('code_update', (data) => {
      if (data.code_block_id === codeBlockId) {
        setCode(data.code);
      }
    });

    socket.on('redirect_to_lobby', () => {
      sessionStorage.removeItem('user_id');
      navigate('/');
    });

    socket.on('problem_solved', () =>{
      setShowSmiley(true);
      setTimeout(() => setShowSmiley(false), 6000); // Hide smiley after 6 seconds
    });

    const handleBeforeUnload = (event) => {
      const storedUserId = sessionStorage.getItem('user_id');
      sessionStorage.removeItem('user_id');
      setUserId('');

      if (storedUserId) {
        socket.emit('userLeft', { 'code_block_id': codeBlockId, 'user_id': storedUserId });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      const storedUserId = sessionStorage.getItem('user_id');
      sessionStorage.removeItem('user_id');
      setUserId('');
      if (storedUserId) {
        socket.emit('userLeft', { 'code_block_id': codeBlockId, 'user_id': storedUserId });
      }
      socket.disconnect();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [codeBlockId, navigate]);

  return (
    <div style={containerStyle}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CodeBlockBar title={title} role={role} studentCounter={studentCounter}/>
          <CodeBlockTaskDescription description={description} task={task}/>
          <CodeBlockEditor code={code} handleCodeChange={handleCodeChange} role={role}/>
          <CodeBlockShowSmiley showSmiley={showSmiley} />
        </>
      )}
    </div>
  );
};

export default CodeBlockPage;
