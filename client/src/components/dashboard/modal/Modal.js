import React from 'react';

// Material UI Components
import {Modal, Backdrop, Fade, Container}  from '@material-ui/core';

// Styles
import {useStyles} from './styles-modal'

import NewContact from './NewContact'

export default function TransitionsModal({addContact, modalState, closeModal}) {
  const classes = useStyles();

  return (
    <Container  className={classes.modalContainer}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        disableBackdropClick
        className={classes.modal}
        open={modalState}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalState}>
          <NewContact addContact={addContact} closeModal={closeModal} />
        </Fade>
      </Modal>
      </Container>
  );
}
