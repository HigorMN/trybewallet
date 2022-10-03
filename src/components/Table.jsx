import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editAction, removeAction } from '../redux/actions';

class Table extends Component {
  removeClick = (id, convertedValue) => {
    const { dispatch } = this.props;
    dispatch(removeAction(id, convertedValue));
  };

  editClick = (id) => {
    const { dispatch } = this.props;
    dispatch(editAction(id));
  };

  render() {
    const { expensesGlobal } = this.props;

    return (
      <div className="table-container center">
        <table>
          <thead>
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
          </thead>
          <tbody className="center tbody">
            {expensesGlobal.map((e) => {
              const convertedValue = (
                +e.value * parseFloat(e.exchangeRates[e.currency].ask)).toFixed(2);
              return (
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
                    {convertedValue}
                  </td>
                  <td className="brv">Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.removeClick(e.id, convertedValue) }
                    >
                      x
                    </button>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.editClick(e.id) }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
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
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
