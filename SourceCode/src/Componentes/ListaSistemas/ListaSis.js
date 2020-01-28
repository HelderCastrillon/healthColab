import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/OpenInNew';
import Grid from '@material-ui/core/Grid'
import { Link } from "react-router-dom";
var firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/firestore");





const useStyles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // height: 450,
    // backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 700,
    height: 650,
  },

  title: {
    // color: theme.palette.primary.light,
    color: 'default',
    textAlign: 'center',
    flexSize: '50',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  img: {

    // maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',


  }
};

class ListaSis extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      projects: []
    }
  }
  getProject() {

    var db = firebase.firestore();
    //this.setState({ funcionalidad: this.props.funcionalidad })
    let ListRef = db.collection("ListColections").get()
      .then(collection => {

        collection.forEach((doc) => {
          let data = doc.data()


          let tile = {
            img: data.DatosGenerales.foto,
            title: data.DatosGenerales.nombre,
            author: data.DatosGenerales.author,
            cols: 1,
            id: doc.id
          }
          let projects = this.state.projects
          projects.push(tile)
          this.setState({ projects })

        });
      })

      .catch((err) => {
        console.log('error de message', err);
      });
  }
  componentDidMount() {
    this.getProject()
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <GridList className={classes.gridList} cols={3}>
            {this.state.projects.map(tile => (
              <GridListTile key={tile.img} cols={tile.cols || 1}>


                <img className={classes.img} alt={tile.title} src={tile.img} />


                <GridListTileBar

                  title={tile.title}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,

                  }}
                  actionIcon={

                    <Link to={"/CrearProject/" + tile.id + "/" + this.props.user}><IconButton aria-label={`star ${tile.title}`}>
                      <StarBorderIcon className={classes.title} />
                    </IconButton>
                    </Link>
                  }
                />

              </GridListTile>
            ))}
          </GridList>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(ListaSis);