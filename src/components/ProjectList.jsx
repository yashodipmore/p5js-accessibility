import React from 'react';

const ProjectList = () => {
  const projects = [
    { id: 1, name: 'My Sketch', lastModified: '2025-03-19' },
    { id: 2, name: 'Animation Demo', lastModified: '2025-03-18' },
  ];

  return (
    <section 
      role="region" 
      aria-label="Project List"
      className="project-list"
    >
      <h2 id="project-list-title">Your Projects</h2>
      <ul
        role="list"
        aria-labelledby="project-list-title"
      >
        {projects.map((project) => (
          <li 
            key={project.id}
            role="listitem"
          >
            <article>
              <h3>
                <button
                  aria-label={`Open project: ${project.name}`}
                  className="project-button"
                >
                  {project.name}
                </button>
              </h3>
              <p aria-label={`Last modified: ${project.lastModified}`}>
                {project.lastModified}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectList;
