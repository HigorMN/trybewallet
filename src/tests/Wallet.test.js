import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import App from '../App';

const emailTest = 'test@test.com';

describe('Testando a pagina de Wallet', () => {
  test('Total de despesa aparece', () => {
    renderWithRouterAndRedux(<Wallet />);

    expect(screen.getByText(/total de despesas:/i)).toBeInTheDocument();
    expect(screen.getByText(/brl/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /logo trybe wallet/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /foto de perfil/i })).toBeInTheDocument();
  });

  test('Total se os inpusts estão na tela', () => {
    renderWithRouterAndRedux(<Wallet />);

    expect(screen.getByText(/descrição da despesa/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /descrição da despesa/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /categoria da despesa/i })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: /valor/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /método de pagamento/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /moeda/i })).toBeInTheDocument();
  });

  test('Testando a aplicação completa', async () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByRole('textbox');
    userEvent.type(inputEmail, emailTest);

    const inputSenha = screen.getByPlaceholderText(/senha/i);
    userEvent.type(inputSenha, emailTest);

    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(buttonEntrar);
    expect(screen.getByText(/test@test\.com/i)).toBeInTheDocument();

    const inputDescricao = screen.getByRole('textbox', { name: /descrição da despesa/i });
    userEvent.type(inputDescricao, 'Batata');
    expect(inputDescricao.value).toBe('Batata');

    const inputCategoria = screen.getByRole('combobox', { name: /categoria da despesa/i });
    expect(inputCategoria.value).toBe('Alimentação');

    const inputValue = screen.getByRole('spinbutton', { name: /valor/i });
    userEvent.type(inputValue, '50');
    expect(inputValue.value).toBe('50');

    const inputPay = screen.getByRole('combobox', { name: /método de pagamento/i });
    expect(inputPay.value).toBe('Dinheiro');

    const inputMoeda = screen.getByRole('combobox', { name: /moeda/i });
    expect(inputMoeda.value).toBe('');

    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(buttonAdd).toBeInTheDocument();
    userEvent.click(buttonAdd);

    const editButton = await screen.findByRole('button', { name: /edit/i });
    expect(editButton).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /batata/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /50\.00/i })).toBeInTheDocument();
    userEvent.click(editButton);

    const saveButtonEdit = screen.getByRole('button', { name: /editar despesa/i });
    expect(saveButtonEdit).toBeInTheDocument();
    userEvent.type(inputDescricao, 'Pera');
    expect(inputDescricao.value).toBe('Pera');

    userEvent.type(inputValue, '20');
    expect(inputValue.value).toBe('20');
    userEvent.click(saveButtonEdit);
    expect(screen.getByRole('cell', { name: /pera/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /20\.00/i })).toBeInTheDocument();

    const deletButton = screen.getByRole('img', { name: /botão de remover/i });
    userEvent.click(deletButton);
  });
});
