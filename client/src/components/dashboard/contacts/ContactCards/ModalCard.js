import React from "react";

// Material UI Components
import { Modal, Backdrop, Fade, Container } from "@material-ui/core";

// Styles
import { useStyles } from "../styles";

// Custom Components
import AddCard from "./AddCard";
import EditCard from "./EditCard";

// modal used to display add or edit contact cards
export default function ModalCard({handleAddContacts, handleUpdateContacts, modalState, ...rest}) {
  const classes = useStyles();

  const getCard = () => {
    if (rest.addCard)
      return <AddCard handleAddContacts={handleAddContacts} {...rest} />;
    else if (rest.editCard)
      return <EditCard handleUpdateContacts={handleUpdateContacts} {...rest} />;
  };

  return (
    <Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        disableBackdropClick
        className={classes.modal}
        open={modalState}
        onClose={rest.handleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalState}>
          <span className={classes.modalCardWrapper}>
            {getCard()}
          </span>
        </Fade>
      </Modal>
    </Container>
  );
}
