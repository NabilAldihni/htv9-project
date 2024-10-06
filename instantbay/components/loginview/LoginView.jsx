import React from 'react';

const LoginView = () => {
  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  };

  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = '#0056b3';
  };

  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = '#007BFF';
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button
        style={buttonStyle}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Go to Items
      </button>
    </div>
  );
};

export default LoginView;