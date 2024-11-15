import React, { useState } from 'react';
import axios from 'axios';

const SnippetForm = () => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/snippets/', { title, code });
      setTitle('');
      setCode('');
      window.location.reload(); 
    } catch (error) {
      console.error("Error creating snippet:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Code"
        required
      />
      <button type="submit">Create Snippet</button>
    </form>
  );
};

export default SnippetForm;
