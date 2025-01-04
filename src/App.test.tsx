import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

// Mock the useFetchProjects hook
jest.mock('./hooks/useFetchProjects', () => ({
  __esModule: true,
  default: () => ({
    projects: [
      { "s.no": 1, "amt.pledged": 1000, "percentage.funded": 50 },
      { "s.no": 2, "amt.pledged": 2000, "percentage.funded": 100 },
      { "s.no": 3, "amt.pledged": 3000, "percentage.funded": 150 },
      { "s.no": 4, "amt.pledged": 4000, "percentage.funded": 200 },
      { "s.no": 5, "amt.pledged": 5000, "percentage.funded": 250 },
      { "s.no": 6, "amt.pledged": 6000, "percentage.funded": 300 }
    ],
    loading: false,
    error: null,
  }),
}));

test('renders projects and pagination', async () => {
  render(<App />);
  expect(screen.getByText(/Page 1/i)).toBeInTheDocument();
  expect(screen.getByText(/1000/i)).toBeInTheDocument();
  expect(screen.getByText(/5000/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/Next/i));
  expect(screen.getByText(/Page 2/i)).toBeInTheDocument();
  expect(screen.getByText(/6000/i)).toBeInTheDocument();
});

test('handles sorting', async () => {
  render(<App />);
  expect(screen.getByText(/1000/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/Amount Pledged/i));
  expect(screen.getAllByText(/1000/i)[0]).toBeInTheDocument();
  fireEvent.click(screen.getByText(/Amount Pledged/i));
  expect(screen.getAllByText(/6000/i)[0]).toBeInTheDocument();
});