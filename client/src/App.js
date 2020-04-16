import React from "react";
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

// Componenets
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import UnprotectedRoute from "./routes/UnprotectedRoute";
import NotFound from "./pages/NotFound"
import WithContext from "./components/context"


const HomeWithContext = WithContext(Home);
const DashboardWithContext = WithContext(Dashboard);

function App() {

  return (
    <Router>
      <Switch>
        <UnprotectedRoute exact path='/' component={HomeWithContext} />
        <ProtectedRoute path="/dashboard" component={DashboardWithContext} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
