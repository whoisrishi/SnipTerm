// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnippetList } from './SnippetList';
import { SnippetCreateForm } from './createSnippet';
import Navbar from './Navbar';
import useAuth from './useAuth';
import { SnippetEditForm } from './newEditSnippet';

const App = () => {
    const { username } = useAuth(); // Get username from useAuth

    return (
        <Router>
            {/* <Navbar username={username} /> */}
            <div className="App">
                <Routes>
                    <Route path="/" element={<SnippetList />} />
                    <Route path="/create" element={<SnippetCreateForm />} />
                    {/* Add more routes as needed */}
                    <Route path="/edit/:snippetId" element={<SnippetEditForm />} /> {/* New route for editing snippets */}
                    
                </Routes>
            </div>
        </Router>
    );
};

export default App;
