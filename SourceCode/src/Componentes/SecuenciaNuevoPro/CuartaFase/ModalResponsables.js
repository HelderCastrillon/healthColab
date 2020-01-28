import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button'
import FormularioResModal from './FormularioResModal.js'
import Grid from '@material-ui/core/Grid'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  fab: {

    bottom: theme.spacing(2),
    right: theme.spacing(3),


  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    alingItems: 'center'
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (


    <div >

      <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleOpen}>
        <AddIcon />
      </Fab>

      <Modal
        align="center"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Responsables !!</h2>
          <p id="simple-modal-description">

            <FormularioResModal handleClose={handleClose} setCurrentProject={props.setCurrentProject} CurrentProject={props.CurrentProject} refreshList={props.refreshList} user={props.user} />


          </p>

        </div>
      </Modal>

    </div>

  );
}