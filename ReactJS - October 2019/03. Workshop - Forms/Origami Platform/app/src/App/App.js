import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import Navigation from '../Navigation/Navigation';
import Aside from '../Aside/Aside';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Posts from '../Posts/Posts';
import ShareThought from '../ShareThought/ShareThought';
import NotFound from '../NotFound/NotFound';

function render(title, Cmp) {
  return function (props) {
    return <Main><Cmp title={title} {...props} /></Main>
  };
}

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navigation />
        <div className='Container'>
          <Aside />
          <Switch>
            <Route path='/' exact render={render('Publications', Posts)} />
            <Route path='/register' render={render('', Register)} />
            <Route path='/login' render={render('', Login)} />
            <Route path='/profile' render={render('', Profile)} />
            <Route path='/share' render={render('', ShareThought)} />
            <Route path='*' render={render('Something went wrong', NotFound)} />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
