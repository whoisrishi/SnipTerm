import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';
import './createSnippet.css'; // Use the same CSS file
import { useParams, Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const SnippetEditForm = () => {
    const { token } = useAuth();
    const { snippetId } = useParams(); // Get the snippet ID from the URL
    const [snippetTitle, setSnippetTitle] = useState('');
    const [snippetCode, setSnippetCode] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('python');
    const [selectedStyle, setSelectedStyle] = useState('friendly');
    const [showLineNumbers, setShowLineNumbers] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [languageOptions, setLanguageOptions] = useState([]);
    const [styleOptions, setStyleOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/choices/');
                setLanguageOptions(response.data.languages);
                setStyleOptions(response.data.styles);
            } catch (error) {
                console.error('Error fetching choices:', error);
            }
        };

        fetchOptions();
    }, [token]);

    useEffect(() => {
        const fetchSnippet = async () => {
            if (snippetId) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/snippets/${snippetId}/`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const snippet = response.data;
                    setSnippetTitle(snippet.title);
                    setSnippetCode(snippet.code);
                    setSelectedLanguage(snippet.language);
                    setSelectedStyle(snippet.style);
                    setShowLineNumbers(snippet.linenos);
                } catch (error) {
                    console.error('Error fetching snippet:', error);
                    setErrorMessage('Failed to fetch snippet.');
                }
            }
        };

        fetchSnippet();
    }, [snippetId, token]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        const snippetData = {
            title: snippetTitle,
            code: snippetCode,
            language: selectedLanguage,
            style: selectedStyle,
            linenos: showLineNumbers
        };

        try {
            // Update existing snippet
            const response = await axios.put(
                `http://127.0.0.1:8000/snippets/${snippetId}/`,
                snippetData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status >= 200 && response.status < 300) {
                // Successfully updated
                alert('Snippet updated successfully!');
            }
        } catch (error) {
            console.error('Error updating snippet:', error);
            setErrorMessage('Failed to update snippet: ' + (error.response?.data?.message || error.message));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="snippet-creation-form">
            <h2>Edit Snippet</h2>
            
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            
            <div className="code-terminal">
                <div className="output-area">
                    {/* Snippet Title Input */}
                    <div className="input-line">
                        <input
                            type="text"
                            value={snippetTitle}
                            onChange={(e) => setSnippetTitle(e.target.value)}
                            placeholder="Snippet Title"
                            className="input-field"
                        />
                    </div>
    
                    {/* Code Input */}
                    <div className="input-line">
                        <textarea
                            value={snippetCode}
                            onChange={(e) => setSnippetCode(e.target.value)}
                            placeholder="Enter your code here"
                            className="code-textarea"
                        />
                    </div>
    
                    {/* Language Selection */}
                    <div className="input-line">
                        <select 
                            value={                            selectedLanguage} 
                            onChange={(e) => setSelectedLanguage(e.target.value)} 
                            className="language-select"
                        >
                            {languageOptions.map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>
    
                    {/* Style Selection */}
                    <div className="input-line">
                        <select 
                            value={selectedStyle} 
                            onChange={(e) => setSelectedStyle(e.target.value)} 
                            className="style-select"
                        >
                            {styleOptions.map((styleChoice) => (
                                <option key={styleChoice} value={styleChoice}>{styleChoice}</option>
                            ))}
                        </select>
                    </div>
    
                    {/* Line Numbers Checkbox */}
                    <div className="input-line">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={showLineNumbers}
                                onChange={() => setShowLineNumbers(!showLineNumbers)}
                                className="line-numbers-checkbox"
                            />
                            Show Line Numbers
                        </label>
                    </div>
    
                    {/* Submit Button */}
                    <div className="input-line">
                        <button
                            type="submit"
                            onClick={handleFormSubmit}
                            disabled={isLoading}
                            className="submit-button"
                        >
                            {isLoading ? 'Updating...' : 'Update Snippet'}
                        </button>
                    </div>
                </div>
    
                {/* Syntax Highlighter Preview */}
                {snippetCode && (
                    <div className="code-preview">
                        <h3>Code Preview:</h3>
                        <SyntaxHighlighter 
                            language={selectedLanguage} 
                            style={solarizedlight} 
                            customStyle={{ background: 'transparent' }} 
                            showLineNumbers={showLineNumbers}
                        >
                            {snippetCode}
                        </SyntaxHighlighter>
                    </div>
                )}
            </div>
            
            <Link to="/">
                <button>Go Back</button>
            </Link>
        </div>
    );
};
