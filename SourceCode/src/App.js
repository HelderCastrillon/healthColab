import React from 'react';
import Grid from '@material-ui/core/Grid';
import Cabecera from './Componentes/PaginaInicio/header'
import Login from './Componentes/Login';
import Home from './Componentes/Home';
import { BrowserRouter as Router, Route } from "react-router-dom";
import CrearProject from './Componentes/NuevoProyecto/CrearProject'
import BtnHome from './Componentes/SecuenciaNuevoPro/QuintaFase/BtnHome.js'
// import image from './img/ImagenPrincipal.jpeg'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }
  getUserData = (user) => {
    this.setState({ user })
  }

  render() {

    return (
      <div >

        <Router>
          <Grid container spacing={3}>
            <Grid item xs={12}>

              <Cabecera user={this.state.user} />
            </Grid>

            {/* <Grid item xs={12}>
          <br/>
          <br/>
          <img src={image} height="450" width="800"/>
          
          </Grid> */}

            <Grid item xs={12} align="center">


              {/* Direccionamiento entre paginas  */}
              <Route path="/login" component={() => <Login getUserData={this.getUserData} />} />
              <Route path="/CrearProject/:id/:user" component={CrearProject} />
              <Route path="/BtnHome" component={BtnHome} />
              <Route path="/Home" component={Home} />

            </Grid>
          </Grid>
        </Router>


      </div>
    )
  }

}
export default App;