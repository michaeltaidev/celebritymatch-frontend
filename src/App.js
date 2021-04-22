import './App.css';
import React, { Component } from 'react';
import IdentifyImage from './components/identify-image/identify-image';
import Navigation from './components/navigation/navigation';
import Login from './components/login/login';
import Register from './components/register/register';
import ImageLinkForm from './components/image-link-form/image-link-form';
import UserInfo from './components/user-info/user-info';

export const CELEBRITYMATCH_API_LINK = 'https://celebritymatch.herokuapp.com/';

const initialState = {
  input: '',
  imageURL: '',
  identifiedImage: '',
  celebrityImage: '',
  route: 'home',
  isLoggedIn: false,
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

  onButtonSubmit = () => {
    this.clearCurrentResults()
    this.fetchClarifaiAPIResults()
  }

  clearCurrentResults() {
    this.setState({ celebrityImage: '', identifiedImage: '', imageURL: '' });
  }

  fetchClarifaiAPIResults = () => {
    this.setState({ imageURL: this.state.input });
    fetch(CELEBRITYMATCH_API_LINK + 'imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: this.state.input })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          this.incrementSubmittedEntries();
        }
        this.displayClarifaiAPIResults(response)
      })
      .catch(err => console.log(err));
  }

  incrementSubmittedEntries = () => {
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

  displayClarifaiAPIResults = (data) => {
    try {
      const matchedCelebrityName = data.outputs[0].data.regions[0].data.concepts[0].name;
      this.setState({ identifiedImage: matchedCelebrityName });
      this.getImageFromGoogleSearchAPI(matchedCelebrityName);
    } catch {
      this.setState({ identifiedImage: 'No match found!' })
    }
  }

  getImageFromGoogleSearchAPI = (searchTerm) => {
    fetch(CELEBRITYMATCH_API_LINK + 'imagematch', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: searchTerm })
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ celebrityImage: response.data.items[0].link })
      })
  }

  onURLInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  changeRoute = (route) => {
    this.setState({ route: route });
  }

  login = () => {
    this.setState({ isLoggedIn: true });
    this.changeRoute('home');
  }

  logout = () => {
    this.setState({ isLoggedIn: false });
    this.changeRoute('login');
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
    const { isLoggedIn, imageURL, route, identifiedImage, celebrityImage } = this.state;
    return (
      <div className="App">
        <Navigation 
          isLoggedIn={isLoggedIn} 
          changeRoute={this.changeRoute} 
          logout={this.logout}
        />
        { route === 'home'
          ? 
            <div>
              <UserInfo 
                isLoggedIn={isLoggedIn}
                username={this.state.user.username}
                submittedEntries={this.state.user.submittedEntries}
              />
              <ImageLinkForm
                onURLInputChange={this.onURLInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
            <IdentifyImage 
              identifiedImage={identifiedImage} 
              celebrityImage={celebrityImage} 
              imageURL={imageURL} 
            />
            </div>
          : (
              route === 'login'
              ? <Login 
                  loadUser={this.loadUser} 
                  changeRoute={this.changeRoute} 
                  login={this.login}
                />
              : <Register 
                  loadUser={this.loadUser} 
                  changeRoute={this.changeRoute} 
                  login={this.login}
                />
            )
        }
      </div>
    );
  }
}

export default App;
