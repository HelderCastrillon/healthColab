import React from 'react'
import Logo from '../img/ImagenPrincipal.jpeg';
import Grid from '@material-ui/core/Grid'


class Home extends React.Component {

  render() {

    return (
      <div >
        <Grid container={24} justify="center">

          {/* <img src="link de la img" height="450" width="800"/> --> imagen desde la web */}

          {/* Aqui va la imagen de manera local  */}
          <img src={Logo} height="450" width="800" />

        </Grid>

      </div>
    )
  }

}
export default Home;