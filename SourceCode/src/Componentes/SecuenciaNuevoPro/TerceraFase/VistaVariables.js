import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ModalVariables from './ModalVariables.js';
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

class VistaVariables extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rows: [],


    }
  }



  // createData(nombreVar, propiedad, tipoDato) {
  //   return { nombreVar, propiedad, tipoDato };
  // }
  // clearform() {
  //   this.setState({ variable: [] })
  // }


  getData() {

    var db = firebase.firestore();
    let ListRef = db.collection("ListColections").doc(this.props.CurrentProject.nameProject);
    let getDoc = ListRef.get()
      .then(doc => {
        let dRaw = doc.data()
        this.setState({ rows: dRaw.Variables })
      })

      .catch((err) => {
        console.log('error de message', err);
      });

    // this.clearform()
  }


  delete(funcion){

    var db=firebase.firestore();
    var  CurrentProject = this.props.CurrentProject
    var nVariables=CurrentProject.Variables.map(vr=>{
      if (vr.variable==funcion){
        vr.status="deleted"
        vr.deletedby=this.props.user
      }
      return vr
    })
    var docRef = db.collection("ListColections").doc(this.props.CurrentProject.nameProject);
        
    var setAda = docRef.update({"Variables":nVariables});
      
  this.getData();

  }
  

  componentDidMount() {
    this.getData()
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="h6">Variables del proyecto: {this.props.CurrentProject.nameProject} </Typography>
        <br />
        <br />

        <Grid container xs={24}  >
          <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align={'center'}><Typography variant="h8">Nombre Variable</Typography></TableCell>
                  <TableCell align={'center'}><Typography variant="h8">Colaborador</Typography></TableCell>
                  <TableCell align={'center'}><Typography variant="h8">Estado</Typography></TableCell>
                  <TableCell align={'center'}><Typography variant="h8">Eliminar</Typography></TableCell>
                  {/* <TableCell align="right">Propiedad</TableCell>
          <TableCell align="right">Tipo de Dato</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.length>=1?this.state.rows.map(vr => (
                  <TableRow >
                    <TableCell align={'center'} component="th" scope="row">
                      {vr.variable}
                    </TableCell>
                    <TableCell align={'center'} component="th" scope="row">
                      {vr.colaborador}
                    </TableCell>
                    <TableCell align={'center'} component="th" scope="row">
                      {vr.status +" by "+ (vr.status=="deleted"?vr.deletedby:vr.colaborador)}                      
                    </TableCell>
                    <TableCell align="center" >  
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<DeleteIcon />}
                    onClick={()=>this.delete(vr.variable)}
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
            <ModalVariables setCurrentProject={this.props.setCurrentProject} CurrentProject={this.props.CurrentProject} refreshList={this.getData.bind(this)} user={this.props.user}/>
          </Grid>

        </Grid>

      </div>
    )
  }
}
export default withStyles(useStyles)(VistaVariables);