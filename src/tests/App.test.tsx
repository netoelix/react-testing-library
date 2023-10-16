import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste o componente <App.tsx>', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    render(<App />, { wrapper: BrowserRouter });
    const firstLink = screen.getByText(/home/i);
    const secondLink = screen.getByText(/about/i);
    const thirdLink = screen.getByText(/favorite pokémon/i);

    expect(firstLink).toBeInTheDocument();
    expect(secondLink).toBeInTheDocument();
    expect(thirdLink).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação.', async () => {
    render(<App />, { wrapper: BrowserRouter });

    expect(screen.getByRole('link', { name: /home/i }));
    const btnHome = screen.getByRole('link', { name: /home/i });

    await userEvent.click(btnHome);

    expect(screen.getByText(/encountered pokémon/i));
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', async () => {
    render(<App />, { wrapper: BrowserRouter });

    expect(screen.getByRole('link', { name: /about/i }));
    const btnAbout = screen.getByRole('link', { name: /about/i });

    await userEvent.click(btnAbout);

    expect(screen.getByText(/about pokédex/i));
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação.', async () => {
    render(<App />, { wrapper: BrowserRouter });

    expect(screen.getByRole('link', { name: /favorite pokémon/i }));
    const btnFavorite = screen.getByRole('link', { name: /favorite pokémon/i });

    await userEvent.click(btnFavorite);

    expect(screen.getByText(/no favorite pokémon found/i));
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', async () => {
    const notFound = '/404error';

    render(
      <MemoryRouter initialEntries={ [notFound] }>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText(/page requested not found/i)).toBeInTheDocument();
  });
});
