import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages';

describe('Teste o componente <NotFound.tsx />', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />, { wrapper: BrowserRouter });
    const headingNotFound = screen.getByRole('heading', { level: 2 });

    expect(headingNotFound).toHaveTextContent(/page requested not found/i);
  });

  test('Teste se a página mostra a imagem com o texto alternativo Clefairy pushing buttons randomly with text I have no idea what i\'m doing.', () => {
    render(<NotFound />, { wrapper: BrowserRouter });
    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'Clefairy pushing buttons randomly with text I have no idea what i\'m doing');
  });
});
