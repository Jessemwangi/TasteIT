/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { useGetData } from './DataLayer/DataAccessLayer';

function MyComponent() {
  const { response, error, isLoading_ } = useGetData('recipe');

  if (isLoading_) {
    return <div>Loading...</div>;
  }
  

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ul>
      {response.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

jest.mock('./DataLayer/DataAccessLayer', () => ({
  useGetData: jest.fn(),
}));

describe('MyComponent', () => {

    test('renders the loading before data is fetch', async () => {
        const data = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' },
          ];

        useGetData.mockReturnValue({
          response: data,
          error: null,
          isLoading_: true,
        });
    
        render(<MyComponent />);
    
      expect(screen.getByText('Loading...')).toBeInTheDocument();
        expect(screen.queryByText('Error:')).not.toBeInTheDocument();
      });

    test('renders the list of items', async () => {
    const data = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ];
    useGetData.mockReturnValue({
      response: data,
      error: null,
      isLoading_: false,
    });

    render(<MyComponent />);

  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  test('renders the error message', async () => {
    const errorMessage = 'Failed to fetch data';

    useGetData.mockReturnValue({
      response: null,
      error: errorMessage,
      isLoading_: false,
    });

    render(<MyComponent />);

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(`Error:`)).toBeInTheDocument();
    });

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });
});

