import React  from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute"

const Dashboard = React.lazy(() => import('../pages/Dashboard'))
const Home = React.lazy(() => import('../pages/Home'))



export default () => ( 
    <BrowserRouter>
      <Route exact path = '/' component={Home} />
      {/* <ProtectedRoute path='/dashboard' component={Dashboard} /> */}
    </BrowserRouter>
 )