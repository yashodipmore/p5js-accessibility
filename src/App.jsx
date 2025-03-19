import React from 'react';
import FileManager from './components/FileManager';
import ProjectList from './components/ProjectList';
import AccessibilityTester from './components/AccessibilityTester';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>P5.js Editor Accessibility Testing Tool</h1>
      </header>
      <main>
        <AccessibilityTester>
          <div className="components-grid">
            <FileManager />
            <ProjectList />
          </div>
        </AccessibilityTester>
      </main>
      <footer>
        <p>This tool helps test and validate accessibility features for the p5.js Editor</p>
      </footer>
    </div>
  );
}

export default App;
