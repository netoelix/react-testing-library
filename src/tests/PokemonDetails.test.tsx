import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste o componente <PokemonDetails.tsx />', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', async () => {
    render(<App />, { wrapper: BrowserRouter });

    const btnDetails = screen.getByText(/more details/i);
    await userEvent.click(btnDetails);

    expect(screen.getByText(/pikachu details/i)).toBeInTheDocument();

    const headingText = screen.getByText(/summary/i);
    expect(headingText).toBeInTheDocument();

    expect(screen.getByText(/This intelligent Pokémon roasts/i));
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', async () => {
    render(<App />, { wrapper: BrowserRouter });

    const home = screen.getByText(/home/i);
    await userEvent.click(home);

    const btnDetails = screen.getByText(/more details/i);
    await userEvent.click(btnDetails);

    const textMap = screen.getByText(/game locations of pikachu/i);
    expect(textMap).toBeInTheDocument();

    const imgLocation = screen.getAllByAltText(/pikachu location/i);
    expect(imgLocation.length).to.equal(2);
    expect(imgLocation[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgLocation[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imgLocation[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(imgLocation[1]).toHaveAttribute('alt', 'Pikachu location');
  });

  test('Teste se o usuário pode favoritar um Pokémon por meio da página de detalhes.', async () => {
    render(<App />, { wrapper: BrowserRouter });

    const home = screen.getByText(/home/i);
    await userEvent.click(home);

    const btnDetails = screen.getByText(/more details/i);
    await userEvent.click(btnDetails);

    const btnFavorite = screen.getByText(/pokémon favoritado?/i);
    await userEvent.click(btnFavorite);

    const imgFavorite = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(imgFavorite).toBeInTheDocument();

    await userEvent.click(btnFavorite);
    expect(btnFavorite).not.toBeChecked();
  });
});
