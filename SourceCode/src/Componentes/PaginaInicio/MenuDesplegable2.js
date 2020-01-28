import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";


const useStyles = makeStyles(theme => ({

  root: {
    position: 'relative',


  },
  Paper: {

    position: 'absolute',
    top: 65,
    right: -20,
    left: -20,
    width: 140,
    backgroundColor: "white"
  }

}));


export default function SimpleMenu() {


  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };




  return (
    <div className={classes.root}>
      <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
        <MenuIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}

      >
        <MenuItem onClick={handleClose}><Link to="/Login">Login</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/Home">Home</Link></MenuItem>

      </Menu>

    </div>
  );

}
