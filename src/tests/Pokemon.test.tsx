import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste o componente <Pokemon.tsx />', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon.', () => {
    render(<App />, { wrapper: BrowserRouter });
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImg = screen.getByRole('img');
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
    expect(pokemonImg).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon.', () => {
    render(<App />, { wrapper: BrowserRouter });
    const btnDetails = screen.getByText(/more details/i);
    expect(btnDetails).toBeInTheDocument();
    expect(btnDetails).toHaveAttribute('href', '/pokemon/25');
  });

  test('Teste se, ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.', async () => {
    render(<App />, { wrapper: BrowserRouter });
    const btnDetails = screen.getByText(/more details/i);
    await userEvent.click(btnDetails);

    expect(screen.getByText(/summary/i)).toBeInTheDocument();
  });
  test('Teste se existe um ícone de estrela nos Pokémon favoritados.', async () => {
    render(<App />, { wrapper: BrowserRouter });

    const home = screen.getByText(/home/i);
    await userEvent.click(home);

    const btnDetails = screen.getByText(/more details/i);
    await userEvent.click(btnDetails);

    const btnFavorite = screen.getByText(/pokémon favoritado?/i);
    await userEvent.click(btnFavorite);

    const imgFavorite = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(imgFavorite).toBeInTheDocument();
  });
});
