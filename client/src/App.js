import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Material-UI Component & Styles
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


// Custom Components
import ProtectedRoute from "./routes/ProtectedRoute";
import UnprotectedRoute from "./routes/UnprotectedRoute";
import NotFound from "./pages/NotFound";
import WithContext from "./components/context";

// Lazy Import App Pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Home = lazy(() => import("./pages/Home"));

// wraps home & dashboard components in HOC containing global app state/functions
const HomeWithContext = WithContext(Home);
const DashboardWithContext = WithContext(Dashboard);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems:"center",
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));


function App() {
  const classes = useStyles();

  return (
    <Router>
      <Switch>
        <Suspense fallback={<div className={classes.root}><CircularProgress /></div>}>
          <UnprotectedRoute exact path="/" component={HomeWithContext} />
          <ProtectedRoute path="/dashboard" component={DashboardWithContext} />
        </Suspense>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
