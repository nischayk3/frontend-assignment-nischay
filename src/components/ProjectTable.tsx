import React from 'react';
import { Project, SortableKeys } from '../types';

interface ProjectTableProps {
  projects: Project[];
  handleSort: (key: SortableKeys) => void;
  sortConfig: { key: SortableKeys; direction: string } | null;
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects, handleSort, sortConfig }) => {
  const getClassNamesFor = (name: SortableKeys) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? (sortConfig.direction === 'ascending' ? 'sorted-asc' : 'sorted-desc') : undefined;
  };

  return (
    <table aria-label="Kickstarter Projects">
      <thead>
        <tr>
          <th className={getClassNamesFor('s.no')}>
            <button onClick={() => handleSort('s.no')} aria-label="Sort by Serial Number">
              S.No.
              <div className='sort-icon'>
                <span className="arrow arrow-up">▲</span>
                <span className="arrow arrow-down">▼</span>
              </div>
            </button>
          </th>
          <th className={getClassNamesFor('percentage.funded')}>
            <button onClick={() => handleSort('percentage.funded')} aria-label="Sort by Percentage Funded">
              Percentage Funded
              <div className='sort-icon'>
                <span className="arrow arrow-up">▲</span>
                <span className="arrow arrow-down">▼</span>
              </div>
            </button>
          </th>
          <th className={getClassNamesFor('amt.pledged')}>
            <button onClick={() => handleSort('amt.pledged')} aria-label="Sort by Amount Pledged">
              Amount Pledged
              <div className='sort-icon'>
                <span className="arrow arrow-up">▲</span>
                <span className="arrow arrow-down">▼</span>
              </div>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project["s.no"]}>
            <td>{project["s.no"]}</td>
            <td>{project["percentage.funded"]}</td>
            <td>{project["amt.pledged"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectTable;