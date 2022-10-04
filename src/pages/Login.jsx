import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import logoTrybeWallet from '../images/logoTrybeWallet.png';
import { userAction } from '../redux/actions';

const NUMBER_MIN = 6;

class Login extends React.Component {
  state = {
    email: '',
    passoword: '',
    disableButton: true,
    redirect: false,
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, () => {
      const { email: e, passoword } = this.state;
      const emailValid = !!(e.includes('@') && e.includes('.com'));
      const passowordValid = passoword.length >= NUMBER_MIN;

      if (emailValid && passowordValid) {
        this.setState({ disableButton: false });
      } else {
        this.setState({ disableButton: true });
      }
    });
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatch } = this.props;

    dispatch(userAction(email));
    this.setState({ redirect: true });
  };

  render() {
    const { email, passoword, disableButton, redirect } = this.state;
    return (
      <main className="login-main center ">
        <form className="login-container center">
          <div className="login-container-img">
            <img src={ logoTrybeWallet } alt="Logo Trybe wallet" />
          </div>
          <div className="input-container-login center">
            <input
              type="email"
              name="email"
              placeholder="Email"
              data-testid="email-input"
              className="input-container-login-input"
              value={ email }
              onChange={ this.handleChange }
            />
          </div>
          <div className="input-container-login center">
            <input
              type="password"
              name="passoword"
              placeholder="Senha"
              data-testid="password-input"
              className="input-container-login-input"
              value={ passoword }
              onChange={ this.handleChange }
            />
          </div>
          <div className="login-container-button center">
            <button
              type="button"
              disabled={ disableButton }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
            { redirect && <Redirect to="/carteira" />}
          </div>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
