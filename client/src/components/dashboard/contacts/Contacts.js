import React from "react";

// Material-UI Components
import { Grid, Container } from "@material-ui/core";

// Components
import Cards from "./Cards";

const testContacts = [
  {
    name: "Alex Nunez",
    Email: "alexnunez1692@gmail.com",
    phone: "111-111-1111",
  },
  {
    name: "Jose Nunez",
    Email: "josenunez1692@gmail.com",
    phone: "222-222-2222",
  },
  {
    name: "Tata Nunez",
    Email: "tatanunez1501@gmail.com",
    phone: "333-333-3333",
  },
  {
    name: "Achilles Nunez",
    Email: "achillesnunez1501@gmail.com",
    phone: "444-444-4444",
  }
];

export default function contacts({userContacts, addContact, deleteContact}) {
  return (
    <Container maxWidth="xl" style={{paddingTop:'9%'}}>
      <Grid container direction="row">

        {userContacts.map((contact) => {
          return (
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Cards deleteContact={deleteContact} name={contact.name} email={contact.email} phone={contact.phoneNumber} contactId={contact._id} />
            </Grid>
          );
        })}
        
      </Grid>
    </Container>
  );
}
