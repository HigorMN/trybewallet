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
      <form>
        <div>
          <label htmlFor="description">
            Descrição da despesa
            <input
              data-testid="description-input"
              type="text"
              name="description"
              id="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="tag">
            Categoria da despesa
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="value">
            Valor
            <input
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              id="value"
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="method">
            Método de pagamento
            <select
              name="method"
              id="method"
              value={ method }
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="currency">
            Moeda
            <select
              name="currency"
              id="currency"
              value={ currency }
              data-testid="currency-input"
              onChange={ this.handleChange }
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
