import React from "react";

// Material-UI Components
import { Grid, Container } from "@material-ui/core";

// Components
import Cards from "./Cards";

const contacts = [
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
];

export default function contact() {
  return (
    <Container fluid>
      <Grid container direction="row" justify="space-evenly">

        {contacts.map((user) => {
          return (
            <Grid item xs={12} md={6} lg={3} xl={3}>
              <Cards name={user.name} email={user.Email} phone={user.phone} />
            </Grid>
          );
        })}
        
      </Grid>
    </Container>
  );
}
