import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';

import logoTrybeWallet from '../images/logoTrybeWallet.png';

class Header extends Component {
  render() {
    const { emailGlobal } = this.props;
    return (
      <header>
        {emailGlobal.length === 0 && <Redirect to="/" /> }
        <div>
          <img src={ logoTrybeWallet } alt="Logo Trybe wallet" />
        </div>
        <div>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
        <div>
          <p data-testid="email-field">{emailGlobal}</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailGlobal: state.user.email,
});

Header.propTypes = {
  emailGlobal: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
