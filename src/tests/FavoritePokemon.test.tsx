import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemon } from '../pages';
import App from '../App';

describe('Teste o componente <FavoritePokemon.tsx />', () => {
  test('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito', () => {
    render(<FavoritePokemon />, { wrapper: BrowserRouter });

    const text = screen.getByText(/no favorite pokémon found/i);

    expect(text).toBeInTheDocument();
  });
  test('Apenas são exibidos os Pokémon favoritados.', async () => {
    render(<App />, { wrapper: BrowserRouter });

    const moreDetails = screen.getByText(/more details/i);
    await userEvent.click(moreDetails);

    const isFavorite = screen.getByText(/pokémon favoritado?/i);
    await userEvent.click(isFavorite);

    const favoriteBtn = screen.getByText(/favorite pokémon/i);
    await userEvent.click(favoriteBtn);

    expect(screen.getByText(/average weight/i)).toBeInTheDocument();
  });
});
