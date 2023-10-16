import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste o componente <Pokedex.tsx />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon.', () => {
    render(<App />, { wrapper: BrowserRouter });
    const headingAbout = screen.getByRole('heading', { level: 2 });

    expect(headingAbout).toHaveTextContent(/encountered pokémon/i);
  });
  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado.', async () => {
    render(<App />, { wrapper: BrowserRouter });

    const btnNext = screen.getByTestId('next-pokemon');
    expect(btnNext).toBeInTheDocument();

    await userEvent.click(btnNext);
    expect(screen.getByText(/charmander/i));

    await userEvent.click(btnNext);
    expect(screen.getByText(/caterpie/i));

    await userEvent.click(btnNext);
    expect(screen.getByText(/ekans/i));

    await userEvent.click(btnNext);
    expect(screen.getByText(/alakazam/i));

    await userEvent.click(btnNext);
    expect(screen.getByText(/mew/i));

    await userEvent.click(btnNext);
    expect(screen.getByText(/rapidash/i));

    await userEvent.click(btnNext);
    expect(screen.getByText(/snorlax/i));

    await userEvent.click(btnNext);
    expect(screen.getByText(/dragonair/i));

    await userEvent.click(btnNext);
    expect(screen.getByText(/pikachu/i));
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    render(<App />, { wrapper: BrowserRouter });
    const allBtn = screen.getAllByTestId(/pokemon-type-button/i);
    expect(allBtn[0]).toHaveTextContent(/electric/i);
    expect(allBtn[1]).toHaveTextContent(/fire/i);
    expect(allBtn[2]).toHaveTextContent(/bug/i);
    expect(allBtn[3]).toHaveTextContent(/poison/i);
    expect(allBtn[4]).toHaveTextContent(/psychic/i);
    expect(allBtn[5]).toHaveTextContent(/normal/i);
    expect(allBtn[6]).toHaveTextContent(/dragon/i);
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro.', async () => {
    render(<App />, { wrapper: BrowserRouter });

    const btnFire = screen.getByText(/fire/i);

    await userEvent.click(btnFire);
    expect(screen.getByText(/charmander/i));

    const btnReset = screen.getByText(/all/i);
    expect(btnReset).toBeInTheDocument();

    await userEvent.click(btnReset);
    expect(screen.getByText(/pikachu/i));
  });
});
