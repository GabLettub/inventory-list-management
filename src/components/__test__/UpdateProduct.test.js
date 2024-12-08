import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UpdateProduct from '../UpdateProduct';
import axios from '../../api/axios';
import { MemoryRouter, Route } from 'react-router-dom';

jest.mock('../../api/axios');

describe('UpdateProduct Component', () => {
  it('fetches product data and renders form', async () => {
    const mockProduct = { id: 1, name: 'Nike', quantity: 12, price: 56.00, stock_in_date: '2022-12-07' };
    axios.get.mockResolvedValueOnce({ data: mockProduct });

    render(
      <MemoryRouter initialEntries={['/update/1']}>
        <Route path="/update/:id">
          <UpdateProduct />
        </Route>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue(/Nike/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue(/12/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue(/56.00/i)).toBeInTheDocument();
    });
  });

  it('handles form submission and updates product', async () => {
    const mockProduct = { name: 'Nike', quantity: 12, price: 56.00, stock_in_date: '2022-12-07' };
    axios.put.mockResolvedValueOnce({ data: mockProduct });

    render(
      <MemoryRouter initialEntries={['/update/1']}>
        <Route path="/update/:id">
          <UpdateProduct />
        </Route>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Product Name/i), { target: { value: 'Nike Updated' } });
    fireEvent.click(screen.getByText(/Update Product/i));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('http://localhost:8000/api/items/1/', mockProduct);
    });
  });
});
