import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from '../../api/axios';
import ItemList from '../ItemList';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../api/axios'); // Mock the axios library

describe('ItemList Component', () => {
  it('renders ItemList and fetches data from the API', async () => {
    const mockData = [
      { id: 1, name: 'Nike', quantity: 12, price: '56.00', stock_in_date: '2022-12-07' },
      { id: 2, name: 'Adidas', quantity: 17, price: '89.00', stock_in_date: '2022-12-08' }
    ];

    axios.get.mockResolvedValueOnce({ data: mockData });

    render(
      <MemoryRouter>
        <ItemList />
      </MemoryRouter>
    );

    // Assert the component renders correctly
    await waitFor(() => {
      expect(screen.getByText(/Item List/i)).toBeInTheDocument();
    });

    // Assert data is fetched and displayed in the table
    expect(screen.getByText(/Nike/i)).toBeInTheDocument();
    expect(screen.getByText(/Adidas/i)).toBeInTheDocument();
    expect(screen.getByText('$56.00')).toBeInTheDocument();
    expect(screen.getByText('$89.00')).toBeInTheDocument();
  });

  it('handles API error gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('API error'));

    render(
      <MemoryRouter>
        <ItemList />
      </MemoryRouter>
    );

    // Test if the error message or fallback is rendered
    await waitFor(() => {
      expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });
  });
});
