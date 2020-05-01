import React from "react";

// Material UI Components
import { Modal, Backdrop, Fade, Container } from "@material-ui/core";

// Styles
import { useStyles } from "../styles";

// Custom Components
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import DeleteCard from "./DeleteCard"
import WithContext from "../../../context";

const AddCardWithContext = WithContext(AddCard)

// modal used to display add or edit contact cards
export default function ModalCard({handleAddContacts, handleUpdateContacts, handleDeleteContacts, ...props}) {
  const classes = useStyles();
  const {modalState, addCard, editCard, deleteCard, ...rest} = props
  // console.log(rest)

  const getCard = () => {
    if (addCard)
      return <AddCardWithContext handleAddContacts={handleAddContacts} {...rest} />;
    else if (editCard)
      return <EditCard handleUpdateContacts={handleUpdateContacts} {...rest} />;
    else if (deleteCard)
      return <DeleteCard handleDeleteContacts={handleDeleteContacts} {...rest} />;
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
