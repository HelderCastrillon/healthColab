import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ModalFuncionalidad from './ModalFuncionalidad.js';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

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

class VistaFuncionalidad extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rows: [],

    }
  }
  // function createData(nombreFunc, propiedad,) {
  //   return { nombreFunc, propiedad,};
  // }
  // clearform() {
  //   this.setState({ funcionalidad: [] })
  // }

  //leer datos 
  getData() {

    var db = firebase.firestore();

    let ListRef=db.collection("ListColections").doc(this.props.CurrentProject.nameProject);
    let getDoc=ListRef.get()
      .then(doc => {
        let dRaw=doc.data()
        this.setState({ rows: dRaw.Funcionalidades })
    })

      .catch((err) => {
        console.log('error de message', err);
      });

    // this.clearform()
  }




   delete(funcion){

    var db=firebase.firestore();
    var  CurrentProject = this.props.CurrentProject
    var nFuncionalidades=CurrentProject.Funcionalidades.map(fn=>{
      if (fn.funcionalidad==funcion){
        fn.status="deleted"
        fn.deletedby=this.props.user
      }
      return fn
    })
    var docRef = db.collection("ListColections").doc(this.props.CurrentProject.nameProject);
        
    var setAda = docRef.update({"Funcionalidades":nFuncionalidades});
      
  this.getData();

  }


  componentDidMount() {
    this.getData()
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
       <Typography variant="h6">Funcionalidades del proyecto: {this.props.CurrentProject.nameProject} </Typography>
        <br />
        <br /> 

        <Grid container xs={24}  >
          <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>

                  <TableCell align={'center'}><Typography variant="h8">Nombre Funcionalidad</Typography></TableCell>
                  <TableCell align={'center'}><Typography variant="h8">Colaborador</Typography></TableCell>
                  <TableCell align={'center'}><Typography variant="h8">Estado</Typography></TableCell>
                  <TableCell align={'center'}><Typography variant="h8">Eliminar</Typography></TableCell>
                  {/* <TableCell align="right">Tipo de Dato</TableCell> */}

                </TableRow>
              </TableHead>
              <TableBody>
              {/* {this.state.rows.Funcionalidad.map */}
                {this.state.rows.length>1?this.state.rows.map(fn => (
                  <TableRow >
                    <TableCell align={'center'} component="th" scope="row">
                      {fn.funcionalidad}                      
                    </TableCell>
                    <TableCell align={'center'} component="th" scope="row">
                      {fn.colaborador}                      
                    </TableCell>
                    <TableCell align={'center'} component="th" scope="row">
                      {fn.status +" by "+ (fn.status=="deleted"?fn.deletedby:fn.colaborador)}                      
                    </TableCell>
                    <TableCell align="center" >  
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<DeleteIcon />}
                     onClick={()=>this.delete(fn.funcionalidad)}
                    />    

                    </TableCell>


                  </TableRow>
                )):""}

              </TableBody>
            </Table>

          </Paper>
        </Grid>
        <br />

        <Grid item container xs={12} alignItems="flex-end" direction="column" placement="right-start">
          <Grid item>
            <ModalFuncionalidad setCurrentProject ={this.props.setCurrentProject} CurrentProject = {this.props.CurrentProject} refreshList={this.getData.bind(this)} user={this.props.user} />
          </Grid>

        </Grid>

      </div>
    );
  }
}
export default withStyles(useStyles)(VistaFuncionalidad);
