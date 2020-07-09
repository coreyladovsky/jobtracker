import React, { useState } from 'react'
import JobsIndex from './JobsIndex'
import { Modal } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CreateJob from './CreateJob';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export default () => {
  const [show, setShow] = useState(true);
  const classes = useStyles();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return (
      <section>
        <button type="button" onClick={handleShow}>
          +
        </button>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={show}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={show}>
            <div className={classes.paper}>
                <h1>Add Job</h1>
                <CreateJob />
            </div>
          </Fade>
        </Modal>
        <JobsIndex />
      </section>
    );
}
