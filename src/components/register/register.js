import React from 'react';
import { CELEBRITYMATCH_API_LINK } from '../../App';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      username: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  onUsernameChange = (event) => {
    this.setState({ username: event.target.value })
  }

  onSubmitSignIn = () => {
    fetch(CELEBRITYMATCH_API_LINK + 'register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      })
    })
    .then(response => response.json())
    .then(user => {
      // Check if registration is validated and ID has been created.
      if (user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
    })
  }

  render() {
    return (
      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
        <main className="pa4">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent w-100" 
                  type="email" 
                  name="email-address" 
                  id="email-address" 
                  onChange={this.onEmailChange}
                />
              </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input 
                    className="b pa2 input-reset ba bg-transparent w-100" 
                    type="password" 
                    name="password" 
                    id="password" 
                    onChange={this.onPasswordChange}
                  />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
                <input 
                  className="b pa2 input-reset ba bg-transparent hover-black w-100" 
                  type="text" 
                  name="username" 
                  id="username" 
                  onChange={this.onUsernameChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input 
                onClick={this.onSubmitSignIn} 
                className="mt3 b ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib"
                type="submit" 
                value="Submit" 
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;