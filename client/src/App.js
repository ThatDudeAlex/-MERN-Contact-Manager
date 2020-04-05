import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Route exact path = '/' component={Home} />
      <Route path = '/dashboard' component={Dashboard} />
    </BrowserRouter>
  );
}

export default App;
