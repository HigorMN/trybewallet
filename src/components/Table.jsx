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
          <tbody className="center tbody">
            {expensesGlobal.map((e) => (
              <tr key={ e.id } className="center table-tr-second">
                <td className="brv">{e.description}</td>
                <td className="brv">{e.tag}</td>
                <td className="brv">{e.method}</td>
                <td className="brv">{parseFloat(e.value).toFixed(2)}</td>
                <td className="brv">{e.exchangeRates[e.currency].name}</td>
                <td className="brv">
                  {parseFloat(e.exchangeRates[e.currency].ask).toFixed(2)}
                </td>
                <td className="brv">
                  {(+e.value * parseFloat(e.exchangeRates[e.currency].ask)).toFixed(2)}
                </td>
                <td className="brv">Real</td>
                <td />
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
