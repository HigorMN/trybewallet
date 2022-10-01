import React, { Component } from 'react';
import arrayTable from './util/arrayTable';

class Table extends Component {
  render() {
    return (
      <div>
        <table>
          <tr>
            {arrayTable.map((e, index) => (<th key={ index }>{e}</th>))}
          </tr>
        </table>
      </div>
    );
  }
}

export default Table;
