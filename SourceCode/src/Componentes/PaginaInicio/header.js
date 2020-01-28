import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
//import AvatarImg from './Avatar';
import Desplegable1 from './MenuDesplegable2';
// import MenuPeq from './MenuDesplegable';
import Avatar from '@material-ui/core/Avatar'
import Login from '../Login'
import firebase from '../../Firebase/firebase.js'

const styles = {
  root: {
    padding: '5px',
    flexGrow: 1,
    background: 'white',
  },
  grow: {
    padding: '5px',
        flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  Button: {
    background: '#004E81'
  },
  Circle: {
    radio: '30px',
    marginLeft: 30,
    marginRight: 0
  }
};


class header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {},
      name:""
    }
  }

  getUserData = (user) => {
    this.setState({ user })
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" >
          <Toolbar>

            <Desplegable1 className={classes.menuButton} />
            <br />
            <br />
            <Typography variant="h6" color="inherit" className={classes.grow} align="center">
              Framework para el Diseño de Sistemas de Informacion en Salud <br/> FrameD-SIS
          </Typography>          
          
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(header);