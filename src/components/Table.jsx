import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
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
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { wallet: { currencies: { expenses } } } = state;
  return {
    expenses,
  };
};

export default connect(mapStateToProps)(Table);
