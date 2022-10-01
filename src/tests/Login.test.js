import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import App from '../App';

const emailTest = 'test@test.com';

describe('Testando a pagina de login', () => {
  test('A rota para esta página é "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');
  });

  test('É renderizado um elemento para que o usuário insira seu email e senha', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
  });

  test('Foram realizadas as seguintes verificações nos campos de email, senha e botão', () => {
    renderWithRouterAndRedux(<App />);

    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputSenha = screen.getByPlaceholderText(/senha/i);

    userEvent.type(inputEmail, 'test');
    userEvent.type(inputSenha, '1');
    expect(buttonEntrar.disabled).toBe(true);

    userEvent.type(inputEmail, '@test.com');
    userEvent.type(inputSenha, '23456');
    expect(buttonEntrar.disabled).toBe(false);
  });

  test('Salva o email no estado da aplicação, com a chave email, assim que o usuário logar', () => {
    const { store } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, emailTest);

    const inputSenha = screen.getByPlaceholderText(/senha/i);
    userEvent.type(inputSenha, '123456');

    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(buttonEntrar);

    const emailRedux = store.getState().user.email;

    expect(emailRedux).toBe(emailTest);
  });

  test('A rota é alterada para "/carteira" após o clique no botão', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, emailTest);

    const inputSenha = screen.getByPlaceholderText(/senha/i);
    userEvent.type(inputSenha, '123456');

    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(buttonEntrar);

    expect(history.location.pathname).toBe('/carteira');
  });
});
