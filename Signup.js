import React from 'react';

const Signup = ({ onSignup, onCancel }) => {
    return (
        <div className="signup-form">
            <form onSubmit={onSignup}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" required />
                
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required />
                
                <label htmlFor="password">Password</label>
                <input type="password" id="password" required />
                
                <button type="submit">Sign Up</button>
            </form>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default Signup;
