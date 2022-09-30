import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchAPICoin } from '../redux/actions';

class WalletForm extends Component {
  state = {
    description: '',
    tag: 'Alimentação',
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPICoin());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { description, tag, value, currency, method } = this.state;
    const { coin } = this.props;
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
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  coin: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  coin: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
