import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import './css/App.css';

function App() {
  return (
    <BrowserRouter>
      <Route exact path = '/' component={SignIn} />
      <Route exact path = '/signup' component={SignUp} />
    </BrowserRouter>
  );
}

export default App;
