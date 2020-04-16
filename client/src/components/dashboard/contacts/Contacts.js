import React from "react";

// Material-UI Components
import { Grid, Container } from "@material-ui/core";

// Components
import Cards from "../contactCards/Cards";

// Displays all user contacts 
export default function Contacts({userContacts, ...props}) {
  return (
    <Container maxWidth="xl" style={{paddingTop:'9%'}}>
      <Grid container direction="row">
        
        {/* Iterates user contacts array and creates a card for each one */}
        {userContacts.map((contact) => {
          const {name, email, phoneNumber, _id} = contact
          const contactInfo = {name, email, phone:phoneNumber, contactId:_id, ...props}

          return (
            <Grid key={contact._id} item xs={12} md={6} lg={4} xl={3}>
              <Cards infoCard {...contactInfo} />
            </Grid>
          );
        })}
        
      </Grid>
    </Container>
  );
}
