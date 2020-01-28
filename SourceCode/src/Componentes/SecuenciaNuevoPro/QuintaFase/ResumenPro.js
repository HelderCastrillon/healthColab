import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

var firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/firestore");

const useStyles = {
  root: {
    width: '100%',
    minWidth: 500,
  },
  button: {
    margin: '10px'
  }
};


class ResumenPro extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rows: [],

    }
  }

  getData2() {
      
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
      
  this.getData2()

  }

  getData3(){
  
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
      
  this.getData3();

  }
   

  getData4() {

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
      
  this.getData4();

  }



 componentDidMount() {
     this.getData2();
     this.getData3();
     this.getData4();
   }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <br />
        <br />
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">Resumen Proyecto: {this.props.CurrentProject.nameProject}</Typography><br/>
           
          
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>

            <Paper className={classes.root}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell component="th" scope="row"><Typography variant="h6">Datos Generales</Typography></TableCell>
    
                      </TableRow>
                </TableHead>
                <TableBody>
                  
                    <TableRow >                                 
                      <TableCell component="th" scope="row"><Typography variant="h8">Descripcion: {this.props.CurrentProject.descripcion}</Typography></TableCell>
                    </TableRow>
                    
                    <TableRow >
                      <TableCell component="th" scope="row"><Typography variant="h8">Linea: {this.props.CurrentProject.linea}</Typography></TableCell>
                    </TableRow>
                   
                   <TableRow >
                      <TableCell component="th" scope="row"><Typography variant="h8">Foto: {this.props.CurrentProject.foto}</Typography></TableCell>
                   </TableRow>
                    
                    <TableRow >
                      <TableCell component="th" scope="row"><Typography variant="h8">Autor: {this.props.CurrentProject.author}</Typography></TableCell>
                    </TableRow>

                    {/* <TableRow >
                      <TableCell component="th" scope="row"><Typography variant="h8">Funcionalidad: {this.props.CurrentProject.Funcionalidad [] }</Typography></TableCell>
                    </TableRow> */}
                </TableBody>
              </Table>

            </Paper>

          </ExpansionPanelDetails>
       
      <ExpansionPanelSummary>
          <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>

                  <TableCell align={'center'}><Typography variant="h6">Nombre Funcionalidad</Typography></TableCell>
                  <TableCell align={'center'}><Typography variant="h6">Colaborador</Typography></TableCell>
                  <TableCell align={'center'}><Typography variant="h6">Estado</Typography></TableCell>
                                   

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
                  </TableRow>
                )):""}

              </TableBody>
            </Table>

          </Paper>


          </ExpansionPanelSummary>
       
          <ExpansionPanelSummary>
          <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align={'center'}><Typography variant="h6">Nombre Variable</Typography></TableCell>
                  <TableCell align={'center'}><Typography variant="h6">Colaborador</Typography></TableCell>
                  <TableCell align={'center'}><Typography variant="h6">Estado</Typography></TableCell>
                  
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
                    
                  </TableRow>
                )) : ""}

              </TableBody>
            </Table>

          </Paper>

          </ExpansionPanelSummary>
 
         
         <ExpansionPanelSummary>
         <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align={'center'}><Typography variant="h6">Nombre Responsable</Typography></TableCell>
                  <TableCell align={'center'}><Typography variant="h6">Colaborador</Typography></TableCell>
                  <TableCell align={'center'}><Typography variant="h6">Estado</Typography></TableCell>
                               
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
                                       

                  </TableRow>
                )) : ""}

              </TableBody>
            </Table>

          </Paper>
          </ExpansionPanelSummary>
          </ExpansionPanel>
      </div>
    );
  }
}
export default withStyles(useStyles)(ResumenPro);