import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { expensesAction, fetchAPICoin, saveEditAction } from '../redux/actions';

const alimentacao = 'Alimentação';
class WalletForm extends Component {
  state = {
    id: 0,
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: alimentacao,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPICoin());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    const { currency } = this.state;
    const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const jsonAPI = await fetchAPI.json();
    const filter = +Object.values(jsonAPI)[Object.keys(jsonAPI).indexOf(currency)].ask;
    dispatch(expensesAction({ ...this.state, exchangeRates: jsonAPI }, filter));
    this.setState((state) => ({
      id: state.id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
    }));
  };

  editClick = () => {
    const { dispatch, expenses, idToEdit: id } = this.props;

    const findObj = expenses.find((e) => e.id === id);
    const removeObjId = expenses.filter((e) => e.id !== id);

    const { value, description, currency, method, tag } = this.state;
    const { exchangeRates } = findObj;

    const editObj = { id, value, description, currency, method, tag, exchangeRates };
    const newEdit = [...removeObjId, editObj].sort((a, b) => a.id - b.id);

    dispatch(saveEditAction(newEdit));

    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
    });
  };

  render() {
    const { description, tag, value, currency, method } = this.state;
    const { coin, editor } = this.props;
    return (
      <form className="wallet-form-container">
        <div className="wallet-form-container-2">
          <label htmlFor="description" className="wallet-form-label-container first-l">
            <p className="bold wallet-form-text">Descrição da despesa</p>
            <input
              data-testid="description-input"
              type="text"
              name="description"
              id="description"
              value={ description }
              onChange={ this.handleChange }
              className="description"
            />
          </label>
          <label htmlFor="tag" className="wallet-form-label-container">
            <p className="bold wallet-form-text">Categoria da despesa</p>
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
              className="tag"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
        <div className="wallet-form-container-2">
          <label htmlFor="value" className="wallet-form-label-container label-2">
            <p className="bold wallet-form-text">Valor</p>
            <input
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              id="value"
              className="value"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="method" className="wallet-form-label-container">
            <p className="bold wallet-form-text">Método de pagamento</p>
            <select
              name="method"
              id="method"
              value={ method }
              data-testid="method-input"
              onChange={ this.handleChange }
              className="method"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="currency" className="wallet-form-label-container center">
            <p className="bold wallet-form-text">Moeda</p>
            <select
              name="currency"
              id="currency"
              value={ currency }
              data-testid="currency-input"
              onChange={ this.handleChange }
              className="currency"
            >
              {coin.map((c) => (
                <option key={ c } value={ c }>{c}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="wallet-form-button-container center">
          {editor
            ? (
              <button
                type="button"
                className="wallet-form-button"
                onClick={ this.editClick }
              >
                Editar despesa
              </button>
            )
            : (
              <button
                type="button"
                onClick={ this.handleClick }
                className="wallet-form-button"
              >
                Adicionar despesa
              </button>
            )}
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  coin: state.wallet.currencies,
  editor: state.wallet.editor,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  coin: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
