import React, { useState } from 'react';

const FileManager = () => {
  const [files] = useState([
    { id: 1, name: 'sketch.js', type: 'file' },
    { id: 2, name: 'assets', type: 'folder' },
  ]);

  return (
    <div 
      role="region" 
      aria-label="File Manager"
      className="file-manager"
    >
      <h2 id="file-manager-title">Files</h2>
      <ul 
        role="tree" 
        aria-labelledby="file-manager-title"
      >
        {files.map((file) => (
          <li 
            key={file.id} 
            role={file.type === 'folder' ? 'treeitem' : 'none'}
            aria-expanded={file.type === 'folder' ? 'false' : undefined}
          >
            <button
              role="treeitem"
              aria-label={`${file.name}, ${file.type}`}
              tabIndex={0}
            >
              {file.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileManager;
