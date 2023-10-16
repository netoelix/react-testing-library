import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { About } from '../pages';

describe('Teste o componente <About.tsx />', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    render(<About />, { wrapper: BrowserRouter });

    expect(screen.getByText(/This application simulates a Pokédex, a digital/i)).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    render(<About />, { wrapper: BrowserRouter });
    const headingAbout = screen.getByRole('heading', { level: 2 });

    expect(headingAbout).toHaveTextContent(/about pokédex/i);
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />, { wrapper: BrowserRouter });
    const textOne = screen.getByText(/This application/i);
    const textTwo = screen.getByText(/One can filter Pokémon/i);

    expect(textOne).toBeInTheDocument();
    expect(textTwo).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
    render(<About />, { wrapper: BrowserRouter });

    const image = screen.getByRole('img', { src: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png' });

    expect(image).toBeInTheDocument();
  });
});
