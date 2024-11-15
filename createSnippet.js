// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import useAuth from './useAuth';
// import './createSnippet.css';
// import './Terminal.css';

// import { Link } from 'react-router-dom';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// export const SnippetCreateForm = () => {
//     const { token } = useAuth();
//     const [title, setTitle] = useState('');
//     const [code, setCode] = useState('');
//     const [language, setLanguage] = useState('python');
//     const [style, setStyle] = useState('friendly');
//     const [linenos, setLinenos] = useState(false);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [snippets, setSnippets] = useState([]);
//     const [languageChoices, setLanguageChoices] = useState([]);
//     const [styleChoices, setStyleChoices] = useState([]);

//     useEffect(() => {
//         const fetchChoices = async () => {
//             try {
//                 const response = await axios.get('http://127.0.0.1:8000/choices/');
//                 console.log('Choices:', response.data);
                
//                 setLanguageChoices(response.data.languages);
//                 setStyleChoices(response.data.styles);
//             } catch (error) {
//                 console.error('Error fetching choices:', error);
//             }
//         };

//         fetchChoices();
//     }, [token]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);

//         const snippetData = {
//             title,
//             code,
//             language,
//             style,
//             linenos
//         };

//         try {
//             const response = await axios.post(
//                 'http://127.0.0.1:8000/snippets/',
//                 snippetData,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             if (response.status >= 200 && response.status < 300) {
//                 setSnippets((prevSnippets) => [...prevSnippets, response.data]);
//                 setTitle('');
//                 setCode('');
//                 setLanguage('python');
//                 setStyle('friendly');
//                 setLinenos(false);
//             } else {
//                 setError('Failed to create snippet: Unexpected response');
//             }
//         } catch (err) {
//             console.error('Error creating snippet:', err);
//             setError('Failed to create snippet: ' + (err.response?.data?.message || err.message));
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!token) {
//         return <p>Please log in to create a snippet.</p>; // Message for unauthenticated users
//     }

//     return (
//         <div className="snippet-form">
//             <h2>Create a New Snippet</h2>
            
//             {error && <p className="error">{error}</p>}
            
//             <div className="terminal">
//                 <div className="terminal-output">
//                     {/* Snippet Title Input */}
//                     <div className="terminal-line">
//                         <span className="terminal-prompt">$ </span> {/* Terminal prompt */}
//                         <input
//                             type="text"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             placeholder="Snippet Title"
//                             className="terminal-input"
//                         />
//                     </div>
    
//                     {/* Code Input */}
//                     <div className="terminal-line">
//                         <span className="terminal-prompt">$ </span>
//                         <textarea
//                             value={code}
//                             onChange={(e) => setCode(e.target.value)}
//                             placeholder="Enter your code here"
//                             className="terminal-textarea"
//                         />
//                     </div>
    
//                     {/* Language Selection */}
//                     <div className="terminal-line">
//                         <span className="terminal-prompt">$ </span>
//                         <select 
//                             value={language} 
//                             onChange={(e) => setLanguage(e.target.value)} 
//                             className="terminal-select"
//                         >
//                             {languageChoices.map(([value, label]) => (
//                                 <option key={value} value={value}>{label}</option>
//                             ))}
//                         </select>
//                     </div>
    
//                     {/* Style Selection */}
//                     <div className="terminal-line">
//                         <span className="terminal-prompt">$ </span>
//                         <select 
//                             value={style} 
//                             onChange={(e) => setStyle(e.target.value)} 
//                             className="terminal-select"
//                         >
//                             {styleChoices.map((styleChoice) => (
//                                 <option key={styleChoice} value={styleChoice}>{styleChoice}</option>
//                             ))}
//                         </select>
//                     </div>
    
//                     {/* Line Numbers Checkbox */}
//                     <div className="terminal-line">
//                         <span className="terminal-prompt">$ </span>
//                         <label className="terminal-checkbox-label">
//                             <input
//                                 type="checkbox"
//                                 checked={linenos}
//                                 onChange={() => setLinenos(!linenos)}
//                                 className="terminal-checkbox"
//                             />
//                             Show Line Numbers
//                         </label>
//                     </div>
    
//                     {/* Submit Button */}
//                     <div className="terminal-line">
//                         <span className="terminal-prompt">$ </span>
//                         <button
//                             type="submit"
//                             onClick={handleSubmit}
//                             disabled={loading}
//                             className="terminal-button"
//                         >
//                             {loading ? 'Creating...' : 'Create Snippet'}
//                         </button>
//                     </div>
//                 </div>
    
//                 {/* Syntax Highlighter Preview */}
//                 {code && (
//                     <div className="terminal-preview">
//                         <h3>Code Preview:</h3>
//                         <SyntaxHighlighter 
//                             language={language} 
//                             style={solarizedlight} 
//                             customStyle={{ background: 'transparent' }} 
//                             showLineNumbers={linenos}
//                         >
//                             {code}
//                         </SyntaxHighlighter>
//                     </div>
//                 )}
//             </div>
            
//             {/* Created Snippets List */}
//             <div>
//                 <h3>Created Snippets</h3>
//                 <ul>
//                     {snippets.map((snippet, index) => (
//                         <li key={index}>{snippet.title}</li>
//                     ))}
//                 </ul>
//             </div>
            
//             <Link to="/">
//                 <button>Go Back</button>
//             </Link>
//         </div>
//     );
    
// };
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';
import './createSnippet.css';
// import './Terminal.css';

import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const SnippetCreateForm = () => {
    const { token } = useAuth();
    const [snippetTitle, setSnippetTitle] = useState('');
    const [snippetCode, setSnippetCode] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('python');
    const [selectedStyle, setSelectedStyle] = useState('friendly');
    const [showLineNumbers, setShowLineNumbers] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [createdSnippets, setCreatedSnippets] = useState([]);
    const [languageOptions, setLanguageOptions] = useState([]);
    const [styleOptions, setStyleOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/choices/');
                console.log('Choices:', response.data);
                
                setLanguageOptions(response.data.languages);
                setStyleOptions(response.data.styles);
            } catch (error) {
                console.error('Error fetching choices:', error);
            }
        };

        fetchOptions();
    }, [token]);

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
            const response = await axios.post(
                'http://127.0.0.1:8000/snippets/',
                snippetData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status >= 200 && response.status < 300) {
                setCreatedSnippets((prevSnippets) => [...prevSnippets, response.data]);
                setSnippetTitle('');
                setSnippetCode('');
                setSelectedLanguage('python');
                setSelectedStyle('friendly');
                setShowLineNumbers(false);
            } else {
                setErrorMessage('Failed to create snippet: Unexpected response');
            }
        } catch (err) {
            console.error('Error creating snippet:', err);
            setErrorMessage('Failed to create snippet: ' + (err.response?.data?.message || err.message));
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return <p>Please log in to create a snippet.</p>; // Message for unauthenticated users
    }

    return (
        <div className="snippet-creation-form">
            <h2>Create a New Snippet</h2>
            
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            
            <div className="code-terminal">
                <div className="output-area">
                    {/* Snippet Title Input */}
                    <div className="input-line">
                        {/* <span className="prompt">$ </span> Terminal prompt */}
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
                        {/* <span className="prompt">$ </span> Terminal prompt */}
                        <textarea
                            value={snippetCode}
                            onChange={(e) => setSnippetCode(e.target.value)}
                            placeholder="Enter your code here"
                            className="code-textarea"
                        />
                    </div>
    
                    {/* Language Selection */}
                    <div className="input-line">
                        {/* <span className="prompt">$ </span> Terminal prompt */}
                        <select 
                            value={selectedLanguage} 
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
                        {/* <span className="prompt">$ </span> Terminal prompt */}
                        <select 
                            value={selectedStyle} 
                            onChange={(e) => setSelectedStyle(                            e.target.value)} 
                            className="style-select"
                        >
                            {styleOptions.map((styleChoice) => (
                                <option key={styleChoice} value={styleChoice}>{styleChoice}</option>
                            ))}
                        </select>
                    </div>
    
                    {/* Line Numbers Checkbox */}
                    <div className="input-line">
                        {/* <span className="prompt">$ </span> Terminal prompt */}
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
                        {/* <span className="prompt">$ </span> Terminal prompt */}
                        <button
                            type="submit"
                            onClick={handleFormSubmit}
                            disabled={isLoading}
                            className="submit-button"
                        >
                            {isLoading ? 'Creating...' : 'Create Snippet'}
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
            
            {/* Created Snippets List */}
            <div>
                <h3>Created Snippets</h3>
                <ul>
                    {createdSnippets.map((snippet, index) => (
                        <li key={index}>{snippet.title}</li>
                    ))}
                </ul>
            </div>
            
            <Link to="/">
                <button>Go Back</button>
            </Link>
        </div>
    );
};
