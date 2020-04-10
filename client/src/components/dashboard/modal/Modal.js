import React from 'react';

// Material UI Components
import {Modal, Backdrop, Fade, Container}  from '@material-ui/core';

// Styles
import {useStyles} from './styles'

// import NewContact from './NewContact'
import Card from '../contactCards/Cards'


export default function TransitionsModal({handleAddContacts, handleUpdateContacts, modalState, handleModal, addModal, editModal, name, email, phone, contactId}) {
  const classes = useStyles();
  let modalType = null;

  if(addModal)
    modalType = <Card addCard handleAddContacts={handleAddContacts} handleModal={handleModal} />
  else if (editModal)
    modalType = <Card editCard handleModal={handleModal} handleUpdateContacts={handleUpdateContacts} name={name} phone={phone} email={email} contactId={contactId} />

  return (
    <Container className={classes.modalContainer}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        disableBackdropClick
        className={classes.modal}
        open={modalState}
        onClose={handleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalState}>
          {modalType}
          {/* <Card addCard handleModal={handleModal} /> */}
        </Fade>
      </Modal>
      </Container>
  );
}
