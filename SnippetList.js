import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './Terminal.css';
import Navbar from './Navbar';
import useAuth from './useAuth';
import { Link } from 'react-router-dom';

export const SnippetList = () => {
    const [snippets, setSnippets] = useState([]);
    const [activeSnippet, setActiveSnippet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMaximized, setIsMaximized] = useState(false);
    const [terminalOutput, setTerminalOutput] = useState([]);
    const { username, token, login, logout } = useAuth();
    const terminalRef = useRef(null);

    useEffect(() => {
        const fetchUsersAndSnippets = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/users/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const user = response.data.results.find(user => user.username === username);
                if (user) {
                    const snippetPromises = user.snippets.map(url => axios.get(url));
                    const snippetResponses = await Promise.all(snippetPromises);
                    setSnippets(snippetResponses.map(res => res.data));
                } else {
                    setError('User not found.');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchUsersAndSnippets();
        } else {
            setLoading(false);
        }
    }, [token, username]);

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            const command = e.target.value.trim();
            const args = command.split(' ').slice(1);

            if (command.startsWith('signup')) {
                if (args.length === 3) {
                    const [usernameInput, email, password] = args;
                    try {
                        await axios.post('http://127.0.0.1:8000/api-auth/signup/', {
                            username: usernameInput,
                            email: email,
                            password: password,
                        });
                        setTerminalOutput(prev => [...prev, `User ${usernameInput} created successfully!`]);
                    } catch (error) {
                        setTerminalOutput(prev => [...prev, error.response?.data?.detail || 'Signup failed. Please try again.']);
                    }
                } else {
                    setTerminalOutput(prev => [...prev, 'Usage: signup <username> <email> <password>']);
                }
            } else if (command.startsWith('login')) {
                if (args.length === 2) {
                    const [usernameInput, password] = args;
                    try {
                        await login(usernameInput, password);
                        setTerminalOutput(prev => [...prev, `Logged in as ${usernameInput}`]);
                    } catch (error) {
                        setTerminalOutput(prev => [...prev, error.message]);
                    }
                } else {
                    setTerminalOutput(prev => [...prev, 'Usage: login <username> <password>']);
                }
            } else if (command.startsWith('logout')) {
                logout();
                setTerminalOutput(prev => [...prev, 'Logged out successfully.']);
                setSnippets([]);
                setActiveSnippet(null);
                setTerminalOutput([]);
            } else {
                setTerminalOutput(prev => [...prev, 'Unknown command']);
            }

            e.target.value = ''; 
            scrollToBottom();
        }
    };

    const scrollToBottom = () => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;




    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this snippet?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://127.0.0.1:8000/snippets/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Remove the deleted snippet from the state
                setSnippets((prevSnippets) => prevSnippets.filter(snippet => snippet.id !== id));
                alert("Snippet deleted successfully!");
            } catch (error) {
                console.error('Error deleting snippet:', error);
                alert('Failed to delete snippet: ' + (error.response?.data?.message || error.message));
            }
        }
    };



    return (
        <>
              <Navbar username={username} />
        <div className={`container ${isMaximized ? 'maximized' : ''}`}>
            {snippets.length > 0 ? (
                <div className="folder-structure">
                    <h2>Snippets</h2>
                    {snippets.map(snippet => (
                        <div key={snippet.id} className="folder-title" onClick={() => setActiveSnippet(snippet)}>
                            <span>{snippet.title}</span>
                            <Link to={`/edit/${snippet.id}`}>Edit</Link>
                            <button onClick={() => handleDelete(snippet.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            ) : (

                
                <div className="empty-message">
                <h2>{!token ? 'Please log in to view your snippets.' : 'No Snippets Available'}</h2>
            </div>
            )}

                <div className={`terminal ${isMaximized ? 'full-screen' : ''}`} ref={terminalRef}>
                    {activeSnippet ? (
                        <>
                            <div className="terminal-header">
                                <div className="button close" onClick={() => setActiveSnippet(null)}></div>
                                <div className="button minimize"></div>
                                <div className="button maximize" onClick={() => setIsMaximized(prev => !prev)}></div>
                            </div>
                            <p className="snippet-meta">{`${activeSnippet.language}@${activeSnippet.owner}`}</p>
                            <SyntaxHighlighter 
                                language={activeSnippet.language} 
                                style={solarizedlight} 
                                customStyle={{ background: 'transparent' }} 
                                className="react-syntax-highlighter"
                            >
                                {activeSnippet.code}
                            </SyntaxHighlighter>
                        </>
                    ) : (
                        <div className="terminal-output">
                            {terminalOutput.map((line, index) => (
                                <div key={index} className="terminal-line">{line}</div>
                            ))}
                            <div className="terminal-input">
                                <span>$ </span>
                                <input 
                                    type="text" 
                                    onKeyPress={handleKeyPress} 
                                    autoFocus 
                                    className="terminal-command"
                                    style={{ background: 'transparent', color: '#f8f8f2', border: 'none' }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

