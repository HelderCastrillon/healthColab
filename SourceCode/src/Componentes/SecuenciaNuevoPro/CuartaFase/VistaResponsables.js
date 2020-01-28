import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ModalResponsables from './ModalResponsables.js';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import { Typography } from '@material-ui/core';


var firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/firestore");

const useStyles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
    margin: '10px'
  }
};


class VistaResponsables extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rows: [],
    }
  }



  // function createData(nombreRes, propiedad, tipoDato) {
  //   return { nombreRes, propiedad, tipoDato };
  // }

  // clearform() {
  //   this.setState({ responsable: [] })
  // }

  getData() {

    var db = firebase.firestore();
    let ListRef = db.collection("ListColections").doc(this.props.CurrentProject.nameProject);
    let getDoc = ListRef.get()
      .then(doc => {
        let dRaw = doc.data()
        this.setState({ rows: dRaw.Responsables })
      })

      .catch((err) => {
        console.log('error de message', err);
      });

    // this.clearform()
  }

  delete(funcion){

    var db=firebase.firestore();
    var  CurrentProject = this.props.CurrentProject
    var nResponsables=CurrentProject.Responsables.map(rp=>{
      if (rp.responsable==funcion){
        rp.status="deleted"
        rp.deletedby=this.props.user
      }
      return rp
    })
    var docRef = db.collection("ListColections").doc(this.props.CurrentProject.nameProject);
        
    var setAda = docRef.update({"Responsables":nResponsables});
      
  this.getData();

  }


  componentDidMount() {
    this.getData()
  }

  render() {


    const { classes } = this.props;

    return (
      <div>
        <Typography variant="h6">Responsables del proyecto: {this.props.CurrentProject.nameProject} </Typography>
        <br />
        <br />

        <Grid container xs={24}  >
          <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align={'center'}><Typography variant="h8">Nombre Responsable</Typography></TableCell>
                  <TableCell align={'center'}><Typography variant="h8">Colaborador</Typography></TableCell>
                  <TableCell align={'center'}><Typography variant="h8">Estado</Typography></TableCell>
                  <TableCell align={'center'}><Typography variant="h8">Eliminar</Typography></TableCell>
                  
                  </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.length>=1?this.state.rows.map(rp => (
                  <TableRow >
                    <TableCell align="center" component="th" scope="row">
                      {rp.responsable}
                    </TableCell>
                    <TableCell align={'center'} component="th" scope="row">
                      {rp.colaborador}                      
                    </TableCell>
                    <TableCell align={'center'} component="th" scope="row">
                      {rp.status +" by "+ (rp.status=="deleted"?rp.deletedby:rp.colaborador)}                      
                    </TableCell>
                    <TableCell align="center" >  
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<DeleteIcon />}
                     onClick={()=>this.delete(rp.responsable)}
                    />    

                    </TableCell>

                  </TableRow>
                )) : ""}

              </TableBody>
            </Table>

          </Paper>
        </Grid>
        <br />

        <Grid item container xs={12} alignItems="flex-end" direction="column" placement="right-start">
          <Grid item>
            <ModalResponsables setCurrentProject={this.props.setCurrentProject} CurrentProject={this.props.CurrentProject} refreshList={this.getData.bind(this)} user={this.props.user}/>
          </Grid>

        </Grid>

      </div>
    );
  }
}

export default withStyles(useStyles)(VistaResponsables);