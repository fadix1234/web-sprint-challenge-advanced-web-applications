import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './Spinner';
import '@testing-library/jest-dom';

// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.



// test('sanity', () => {
//   expect(true).toBe(false)
// })

test('sanity', () => {
  const { container, queryByText } = render(<Spinner on={true} />);
  
  const spinner = container.querySelector('#spinner');
  const spinnerText = queryByText('Please wait...');
  
  expect(spinner).toBeInTheDocument();
  expect(spinnerText).toBeInTheDocument();
});

test('spinner is not rendered when "on" prop is false', () => {
  const { container } = render(<Spinner on={false} />);
  
  const spinner = container.querySelector('#spinner');
  
  expect(spinner).not.toBeInTheDocument(); 
});