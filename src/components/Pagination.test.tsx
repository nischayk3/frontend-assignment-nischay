import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import '@testing-library/jest-dom';

const handleNextPage = jest.fn();
const handlePreviousPage = jest.fn();

test('renders pagination controls', () => {
  render(<Pagination currentPage={1} totalPages={2} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />);
  expect(screen.getByText(/Page 1 of 2/i)).toBeInTheDocument();
});

test('handles next page button click', () => {
  render(<Pagination currentPage={1} totalPages={2} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />);
  fireEvent.click(screen.getByText(/Next/i));
  expect(handleNextPage).toHaveBeenCalled();
});

test('handles previous page button click', () => {
  render(<Pagination currentPage={2} totalPages={2} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />);
  fireEvent.click(screen.getByText(/Previous/i));
  expect(handlePreviousPage).toHaveBeenCalled();
});