import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectTable from './ProjectTable';
import { Project, SortableKeys } from '../types';
import '@testing-library/jest-dom';

const projects: Project[] = [
  { "s.no": 1, "amt.pledged": 1000, "percentage.funded": 50, blurb: '', by: '', country: '', currency: '', "end.time": '', location: '', state: '', title: '', type: '', "num.backers": '0', url: '' },
  { "s.no": 2, "amt.pledged": 2000, "percentage.funded": 100, blurb: '', by: '', country: '', currency: '', "end.time": '', location: '', state: '', title: '', type: '', "num.backers": '0', url: '' },
];

const handleSort = jest.fn();

test('renders project table', () => {
  render(<ProjectTable projects={projects} handleSort={handleSort} sortConfig={null} />);
  expect(screen.getByText(/S.No./i)).toBeInTheDocument();
  expect(screen.getByText(/1000/i)).toBeInTheDocument();
  expect(screen.getByText(/2000/i)).toBeInTheDocument();
});

test('handles sort button click', () => {
  render(<ProjectTable projects={projects} handleSort={handleSort} sortConfig={null} />);
  fireEvent.click(screen.getByText(/Amount Pledged/i));
  expect(handleSort).toHaveBeenCalledWith('amt.pledged');
});