import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

describe('Login Component', () => {
  test('renders Login component', () => {
    render(<Login />);
    expect(screen.getByText(/Inicia sesión/)).toBeInTheDocument();
  });

  test('registers user successfully', async () => {
    render(<Login />);

    // Simula el proceso de registro con datos válidos
    fireEvent.change(screen.getByPlaceholderText(/Nombre/), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Apellidos/), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirmar contraseña/), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText(/Regístrate/));

    // Espera a que se muestre el mensaje de éxito
    await waitFor(() => {
      expect(screen.getByText(/Cuenta creada exitosamente/)).toBeInTheDocument();
    });
  });

  test('handles password mismatch during registration', async () => {
    render(<Login />);

    // Simula el proceso de registro con contraseñas que no coinciden
    fireEvent.change(screen.getByPlaceholderText(/Nombre/), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Apellidos/), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirmar contraseña/), { target: { value: 'differentpassword' } });

    fireEvent.click(screen.getByText(/Regístrate/));

    // Espera a que se muestre el mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/Las contraseñas no coinciden/)).toBeInTheDocument();
    });
  });

  // Agrega más pruebas según sea necesario
});