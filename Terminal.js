
import React from 'react';
import './Terminal.css';

const Terminal = ({ children }) => {
  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="circle red"></div>
        <div className="circle yellow"></div>
        <div className="circle green"></div>
      </div>
      <div className="terminal-body">
        {children}
      </div>
    </div>
  );
};

export default Terminal;
