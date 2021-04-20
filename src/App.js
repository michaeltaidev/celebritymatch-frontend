import './App.css';
import React, { Component } from 'react';
import IdentifyImage from './components/identify-image/identify-image';
import Navigation from './components/navigation/navigation';
import Login from './components/login/login';
import Register from './components/register/register';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/image-link-form/image-link-form';
import UserInfo from './components/user-info/user-info';

export const CELEBRITYMATCH_API_LINK = 'https://celebritymatch.herokuapp.com/';

const initialState = {
  input: '',
  imageURL: '',
  identifiedImage: '',
  route: 'login',
  isSignedIn: false,
  user: {
    id: '',
    email: '',
    username: '',
    submittedEntries: 0,
    joinDate: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  identifyImage = (data) => {
    try {
      const matchedCelebrityName = data.outputs[0].data.regions[0].data.concepts[0].name;
      this.setState({ identifiedImage: matchedCelebrityName });
    }
    catch {
      this.setState({ identifiedImage: 'No match found. Try a different photo!' })
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    fetch(CELEBRITYMATCH_API_LINK + 'imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: this.state.input })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch(CELEBRITYMATCH_API_LINK + 'image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: this.state.user.id })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { submittedEntries: count }))
        })
        .catch(console.log)
      }
      this.identifyImage(response)
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }

    this.setState({route: route});
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        email: data.email,
        username: data.username,
        submittedEntries: data.submitted_entries,
        joinDate: data.join_date
      }
    })
  }

  render() {
    const { isSignedIn, imageURL, route, identifiedImage } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <UserInfo 
                username={this.state.user.username} 
                submittedEntries={this.state.user.submittedEntries}
              />
              <Logo />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <IdentifyImage identifiedImage={identifiedImage} imageURL={imageURL} />
            </div>
          : (
              route === 'login'
              ? <Login loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )

        }
      </div>
    );
  }
}

export default App;
