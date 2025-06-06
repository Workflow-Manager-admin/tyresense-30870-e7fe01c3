import React from 'react';
import './App.css';

import logo from './logo.svg';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <img
                src={logo}
                alt="TyreSense Logo"
                className="header-logo"
                style={{
                  height: 40,
                  width: 40,
                  filter: 'drop-shadow(0 0 8px #00ffff)',
                  background: 'radial-gradient(circle, #202140 60%, transparent 100%)',
                  borderRadius: '50%',
                  border: '2px solid #00ffff',
                  boxShadow: '0 0 10px #00ffff66, 0 0 40px #00ffff1A',
                  marginRight: 12
                }}
              />
              <span className="brand-title" style={{ color: '#00ffff', fontWeight: 700, fontSize: '1.35rem' }}>
                TyreSense
              </span>
            </div>
            <button className="btn">Template Button</button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="hero">
            <div className="subtitle">AI Workflow Manager Template</div>
            
            <h1 className="title">tyresense_frontend</h1>
            
            <div className="description">
              Start building your application.
            </div>
            
            <button className="btn btn-large">Button</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;