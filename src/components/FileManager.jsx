import React, { useState } from 'react';

const FileManager = () => {
  const [files, setFiles] = useState([
    { id: 1, name: 'sketch.js', type: 'file' },
    { id: 2, name: 'assets', type: 'folder' },
  ]);

  return (
    <div 
      role="region" 
      aria-label="File Manager"
      className="file-manager"
    >
      <h2 id="file-manager-title">File Manager</h2>
      <ul 
        role="tree" 
        aria-labelledby="file-manager-title"
      >
        {files.map((item) => (
          <li 
            key={item.id}
            role={item.type === 'folder' ? 'treeitem' : 'none'}
            aria-expanded={item.type === 'folder' ? 'false' : undefined}
          >
            <span 
              role="button"
              tabIndex={0}
              aria-label={`${item.name} ${item.type}`}
            >
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileManager;
