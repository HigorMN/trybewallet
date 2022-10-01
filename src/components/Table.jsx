import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expensesGlobal } = this.props;

    return (
      <div className="table-container center">
        <table>
          <tr className="table-tr-first center">
            <th className="br">Descrição</th>
            <th className="br">Tag</th>
            <th className="br">Método de pagamento</th>
            <th className="br">Valor</th>
            <th className="br">Moeda</th>
            <th className="br">Câmbio utilizado</th>
            <th className="br">Valor convertido</th>
            <th className="br">Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          <tbody>
            {expensesGlobal.map((e) => (
              <tr key={ e.id }>
                <td>{e.description}</td>
                <td>{e.tag}</td>
                <td>{e.method}</td>
                <td>{parseFloat(e.value).toFixed(2)}</td>
                <td>{e.exchangeRates[e.currency].name}</td>
                <td>{parseFloat(e.exchangeRates[e.currency].ask).toFixed(2)}</td>
                <td>
                  {(+e.value * parseFloat(e.exchangeRates[e.currency].ask)).toFixed(2)}
                </td>
                <td>Real</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesGlobal: state.wallet.expenses,
});

Table.propTypes = {
  expensesGlobal: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Table);
