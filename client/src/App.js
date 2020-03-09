import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import SignIn from './components/home/SignIn';
import SignUp from './components/home/SignUp';
import Home from './pages/Home';
import './css/App.css';

function App() {
  return (
    <BrowserRouter>
      <Route exact path = '/' component={Home} />
      <Route exact path = '/signup' component={SignUp} />
    </BrowserRouter>
  );
}

export default App;
