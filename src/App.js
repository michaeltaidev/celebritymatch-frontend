import './App.css';
import React, { Component } from 'react';
import ImageDisplay from './components/image-display/image-display';
import Navigation from './components/navigation/navigation';
import Login from './components/login/login';
import Register from './components/register/register';
import ImageLinkForm from './components/image-link-form/image-link-form';
import UserInfo from './components/user-info/user-info';

export const CELEBRITYMATCH_API_LINK = 'https://celebritymatch.herokuapp.com/';

const initialState = {
  input: '',
  submittedImageURL: '',
  matchedCelebrityName: '',
  celebrityImageURL: '',
  route: 'home',
  isLoggedIn: false,
  isFindingMatch: false,
  hasMatchResults: false,
  hasCelebrityMatch: false,
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

  onURLInputChange = (event) => {
    if (this.isInputAnImageLink(event.target.value)) {
      this.setState({ 
        input: event.target.value 
      }, () => {
        this.findMatch()
      });
    }
  }

  clearInputField = (event) => {
    event.target.value = "";
  }

  isInputAnImageLink = (input) => {
    return (/\.(gif|jpg|jpeg|tiff|png)$/i).test(input)
  }

  findMatch = () => {
    this.setState({ hasMatchResults: false, isFindingMatch: true })
    this.clearCurrentResults()
    this.fetchClarifaiAPIResults()
  }

  clearCurrentResults() {
    this.setState({ celebrityImageURL: '', matchedCelebrityName: '', submittedImageURL: '' });
  }

  fetchClarifaiAPIResults = () => {
    this.setState({ submittedImageURL: this.state.input });
    fetch(CELEBRITYMATCH_API_LINK + 'ImageURL', {
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
      this.setState({ matchedCelebrityName: matchedCelebrityName });
      this.getImageFromGoogleSearchAPI(matchedCelebrityName);
    } catch {
      this.setState({ isFindingMatch: false, hasMatchResults: true, hasCelebrityMatch: false })
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
        this.setState({ celebrityImageURL: response.data.items[0].link, isFindingMatch: false, hasMatchResults: true, hasCelebrityMatch: true })
      })
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
    const { isLoggedIn, submittedImageURL, route, matchedCelebrityName, celebrityImageURL, isFindingMatch, hasMatchResults, hasCelebrityMatch } = this.state;
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
                clearInputField={this.clearInputField}
                findMatch={this.findMatch}
              />
            <ImageDisplay 
              matchedCelebrityName={matchedCelebrityName} 
              celebrityImageURL={celebrityImageURL} 
              submittedImageURL={submittedImageURL} 
              isFindingMatch={isFindingMatch}
              hasMatchResults={hasMatchResults}
              hasCelebrityMatch={hasCelebrityMatch}
              downloadImage={this.downloadImage}
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
