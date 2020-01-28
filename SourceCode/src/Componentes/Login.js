import React, { Component } from 'react'
import firebase from '../Firebase/firebase'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Carta from './PaginaInicio/Card'
import ListaSys from './ListaSistemas/ListaSis'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({

  button: {
    margin: theme.spacing(1),
    height: 48,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    display: 'flex',
    alignItems: 'center',
    width: 170,
    justifyContent: 'justify',
    flexDirection: 'row',
  },
  input: {
    display: 'none',
  },
  avatar: {
    margin: 10,
  }


}));


export default class Login extends Component {



  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }



  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }


  handleAuth() {
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

      .then(result => console.log('${result.user.email} ha iniciado sesion'))
      .catch(error => console.log(error));

  }

  handleLogout() {
    firebase.auth().signOut()
      .then(result => console.log('${result.user.email} ha salido sesion'))
      .catch(error => console.log(' Error ${error.code}: ${error.message}'));
  }

  renderLoginButton() {

    //Si el usuario esta logueado
    if (this.state.user) {

      return (
        <div>
          <Grid container spacing={24} align="right" >
            <Grid sm={12}  >

              <Typography variant="h4" align="left">
               Hola  {this.state.user.displayName }, aquí puedes ver los proyectos
             </Typography>
              <div align="center">
              <Button variant="contained" onClick={this.handleLogout}>Salir</Button>
              <Button variant="contained"  ><Link to={"/CrearProject/new/"+this.state.user.displayName}>Crear Proyecto</Link></Button>

              </div>



              <br />
              <br />
              <ListaSys user={this.state.user.displayName} />
            </Grid>

          </Grid>
          <br />
          <br />




          {/* <br />
          <br />
          <Grid container spacing={24} justify="center" >
           
          </Grid> */}
        </div>

      );
    } else {
      return (

        <div >

          <Grid container spacing={24} justify="center" >
            <Carta />
          </Grid>

          <br />
          <br />

          <Grid container spacing={24} justify="center" >
            {/* // Si no lo está logueado */}
            <Button variant="contained" onClick={this.handleAuth} >
              Iniciar Sesion
            </Button>
          </Grid>

        </div>


      );



    }
  }


  render() {
    return (
      <div >
        <br />
        <br />
        <Grid container spacing={24} justify="center" >

          <p>{this.renderLoginButton()}</p>

        </Grid>

      </div>

    )
  }
}
