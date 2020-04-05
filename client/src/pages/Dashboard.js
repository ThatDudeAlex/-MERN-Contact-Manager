import React from 'react';

// Material-UI Components
import {Grid, CssBaseline} from '@material-ui/core'

// Components
import Header from '../components/dashboard/header/Header'
import Contacts from '../components/dashboard/contacts/Contacts'

export default function dashboard() {  
    return (
      <Grid container component="main">
        <CssBaseline />
        <Header />
        <Contacts />
      </Grid>
    );
}
