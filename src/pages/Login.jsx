import React from 'react';

class Login extends React.Component {
  state = {
    email: '',
    passoword: '',
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { email, passoword } = this.state;
    return (
      <main>
        <div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              data-testid="email-input"
              value={ email }
              onChange={ this.handleChange }
            />
          </div>
          <div>
            <input
              type="password"
              name="passoword"
              placeholder="Senha"
              data-testid="password-input"
              value={ passoword }
              onChange={ this.handleChange }
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Login;
