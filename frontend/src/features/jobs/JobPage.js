import React, { useState } from "react";
import JobsIndex from "./JobsIndex";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CreateJob from "./CreateJob";
import FilterOptions from '../filter/filterOptions';


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
  const [show, setShow] = useState(false);
  const classes = useStyles();
  const [selectedJob, setSelectedJob] = useState(null);

  const handleClose = () => { 
    setShow(false)
    setSelectedJob(null)
  };
  const handleOpen = () => setShow(true);

  return (
    <section>
      <button type="button" onClick={handleOpen}>
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
            <CreateJob handleClose={handleClose} selectedJob={selectedJob} />
          </div>
        </Fade>
      </Modal>
      <FilterOptions />
      <JobsIndex setSelectedJob={setSelectedJob} handleOpen={handleOpen} />
    </section>
  );
};
