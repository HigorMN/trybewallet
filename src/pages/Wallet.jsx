import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <main className="wallet-container">
          <WalletForm />
          <Table />
        </main>
      </>
    );
  }
}

export default connect()(Wallet);
