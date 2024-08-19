import React from 'react';
import Lobby from './pages/Lobby'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // for paging
import CodeBlockPage from './pages/CodeBlockPage';

{/* Routing - base on the URL currently accessing determine which content component will be displayed, same html diff content */}
{/*react-router-dom - allows defining different routes (URL) and associate them to specific component*/}
{/*BrowserRouter- uses the browser's History API to keep track of the current URL and manage navigation without full page reloads*/}
{/*Routes- container for defining multiple routes within your application.*/}
{/*Route -  represents a specific route or URL path, element - the react component to render*/}
{/*Router - wrap entire apllication makes the routing functionality available to all the components within your app*/}
function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/" element={<Lobby/> } /> {/* Lobby route first */}
        <Route path="/codeblock/:codeBlockId" element={<CodeBlockPage />} />

      </Routes>
    </Router>
  );
}

export default App;