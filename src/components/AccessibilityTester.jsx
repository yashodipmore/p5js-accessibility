import React, { useState, useEffect } from 'react';
import axe from '@axe-core/react';

const AccessibilityTester = ({ children }) => {
  const [violations, setViolations] = useState([]);
  const [isTestMode, setIsTestMode] = useState(false);

  useEffect(() => {
    if (isTestMode) {
      runAccessibilityTests();
    }
  }, [isTestMode]);

  const runAccessibilityTests = async () => {
    try {
      const results = await axe.run(document.body);
      setViolations(results.violations);
    } catch (error) {
      console.error('Error running accessibility tests:', error);
    }
  };

  return (
    <div className="accessibility-tester">
      <div className="controls" role="toolbar" aria-label="Accessibility Testing Controls">
        <button
          onClick={() => setIsTestMode(!isTestMode)}
          aria-pressed={isTestMode}
        >
          {isTestMode ? 'Exit Test Mode' : 'Enter Test Mode'}
        </button>
      </div>

      <div className="content">
        {children}
      </div>

      {isTestMode && (
        <div 
          role="complementary"
          aria-label="Accessibility Test Results"
          className="test-results"
        >
          <h2>Accessibility Issues Found: {violations.length}</h2>
          <ul>
            {violations.map((violation, index) => (
              <li key={index}>
                <h3>{violation.impact} Impact: {violation.help}</h3>
                <p>{violation.description}</p>
                <p>Elements affected: {violation.nodes.length}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccessibilityTester;
