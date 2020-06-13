import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import Navigation from '../Navigation/Navigation';
import Aside from '../Aside/Aside';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import Profile from '../Profile/Profile';
import Posts from '../Posts/Posts';
import ShareThought from '../ShareThought/ShareThought';
import NotFound from '../NotFound/NotFound';

import usersService from '../services/usersService';

function render(title, Cmp, otherProps) {
  return function (props) {
    return <Main><Cmp title={title} {...props} {...otherProps} /></Main>
  };
}

function parseCookies() {
  return document.cookie.split('; ').reduce((acc, cookie) => {
    const [cookieName, cookieValue] = cookie.split('=');
    acc[cookieName] = cookieValue;
    return acc;
  }, {})
}

class App extends React.Component {
  constructor(props) {
    super(props);
    const cookies = parseCookies();
    const isLogged = !!cookies['x-auth-token'];
    this.state = { isLogged };
  }

  login = (history, data) => {
    return usersService
      .login(data)
      .then(() => {
        this.setState({ isLogged: true });
        history.push('/');
      });
  }

  logout = (history) => {
    usersService
      .logout()
      .then(() => {
        this.setState({ isLogged: false });
        history.push('/', {});
      });
  }

  render() {
    const { isLogged } = this.state;

    return (
      <BrowserRouter>
        <div className='App'>
          <Navigation isLogged={isLogged} />
          <div className='Container'>
            <Aside isLogged={isLogged} />
            <Switch>
              <Route path='/' exact><Redirect to='/posts' /></Route>
              <Route path='/posts' render={render('Posts', Posts, { isLogged })} />
              <Route path='/register' render={render('Register', Register, { isLogged })} />
              <Route path='/login' render={render('Login', Login, { isLogged, login: this.login })} />
              <Route path='/logout' render={render('Logout', Logout, { isLogged, logout: this.logout })} />
              <Route path='/profile' render={render('Profile', Profile, { isLogged })} />
              <Route path='/share' render={render('Share thought', ShareThought, { isLogged })} />
              <Route path='*' render={render('Something went wrong', NotFound)} />
            </Switch>
          </div>
          <Footer isLogged={isLogged} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
