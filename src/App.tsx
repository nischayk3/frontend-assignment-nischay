import React, { useState, useMemo } from 'react';
import './App.css';
import useFetchProjects from './hooks/useFetchProjects';
import ProjectTable from './components/ProjectTable';
import Pagination from './components/Pagination';
import Loading from './components/Loading';
import { SortableKeys } from './types';

const App: React.FC = () => {
  const { projects, loading, error } = useFetchProjects();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: string } | null>(null);
  const projectsPerPage = 5;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleSort = (key: SortableKeys) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = 'none';
      }
    }
    setSortConfig(direction === 'none' ? null : { key, direction });
  };

  const sortedProjects = useMemo(() => {
    let sortableProjects = [...projects];
    if (sortConfig !== null) {
      sortableProjects.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProjects;
  }, [projects, sortConfig]);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = sortedProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (projects.length === 0) {
    return <div>No projects found</div>;
  }

  return (
    <div className="container">
      <h1>Frontend Assignment</h1>
      <ProjectTable projects={currentProjects} handleSort={handleSort} sortConfig={sortConfig} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </div>
  );
};

export default App;