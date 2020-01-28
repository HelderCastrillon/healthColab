import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import {useParams} from "react-router-dom";



// Importaciones de los componentes que se muestran en el asistente (5 Fases)
import DescripcionGene from '../SecuenciaNuevoPro/PrimeraFase/DescripcionGene';
import VistaFuncionalidad from '../SecuenciaNuevoPro/SegundaFase/VistaFuncionalidad.js'
import VistaVariables from '../SecuenciaNuevoPro/TerceraFase/VistaVariables.js'
import VistaResponsables from '../SecuenciaNuevoPro/CuartaFase/VistaResponsables.js'
import ResumenPro from '../SecuenciaNuevoPro/QuintaFase/ResumenPro.js'
import BtnHome from '../SecuenciaNuevoPro/QuintaFase/BtnHome.js'
// Importacion de la imagen finalizado 

import Image from '../../img/ImagenFinalizacion.jpg'

var firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/firestore");


const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    alignItems: 'center'
  },
  button: {
    marginRight: theme.spacing(1),

  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    alignItems: 'center'
  },
}));


function getSteps() {
  return ['Datos Generales', 'Agregar Funcionalidades', 'Agregar Variables', 'Agregar Responsables', 'Finalizar Sistema'];
}



export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [idloaded, SetId] = React.useState("");
  const steps = getSteps();
  const [project, setProject] = useState({});
  let { id,user} = useParams();

  //Hooks tiene 2 parametros, [variableactual,funcion que se va a actualizar]= useState({estado inicial})

  const setCurrentProject = nproject => {
    if(project!=nproject){     
      if(id!="new"){
        getData(id)
      }      
      else{
        setProject(nproject)
      }
         
    }
      
  };

    //leer datos 
    const getData= id => {

      var db = firebase.firestore();
  
      let ListRef=db.collection("ListColections").doc(id);
      let getDoc=ListRef.get()
        .then(doc => {
          let dRaw=doc.data()
          dRaw["nameProject"]=id
          setProject(dRaw)
          setActiveStep(1)
      })
  
        .catch((err) => {
          console.log('error de message', err);
        });
  
   }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <DescripcionGene setCurrentProject = {setCurrentProject}  CurrentProject = {project} user={user}/>;
      case 1:
        return <VistaFuncionalidad setCurrentProject = {setCurrentProject} CurrentProject = {project}  user={user}/>;
      case 2:
        return <VistaVariables  setCurrentProject = {setCurrentProject} CurrentProject = {project}  user={user}/>;
      case 3:
        return <VistaResponsables setCurrentProject = {setCurrentProject} CurrentProject = {project}  user={user}/>;
  
      default:
        return <ResumenPro setCurrentProject = {setCurrentProject} CurrentProject = {project}/>;
    }
  }

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  
  const handleReset = () => {
    setActiveStep(0);
  };

 //load project selected
 if(id!="new" && idloaded!=id){
  SetId(id)
  setCurrentProject(id)
}
  return (
    <div className={classes.root}>

      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Grid container spacing={24} justify="center">
        <div>
          {activeStep === steps.length ? (
            <div>
               
              <img src={Image} width="850" height="400" align="center" />
              <Typography className={classes.instructions} variant="h3">
               
                Sistema Completado !!
             <br />
                <br />
              </Typography>
              <Typography variant="h5" className={classes.instructions}>
                ¿Que deseas hacer?
             </Typography>

              {/* botones que redirigen a visualizar los proyectos  o crear uno nuevo  */}
              <BtnHome />
              <Button variant="contained" color="primary" onClick={handleReset} className={classes.button}>
                Crear Nuevo proyecto
            </Button>

            </div>
          ) : (
              <div >
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                <br />
                <br />
                <div align="center">
                  <Button variant="contained" disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                    Atras
              </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  
                  >
                    {activeStep === steps.length - 1 ? 'Finalizado' : 'Siguiente'}
                  </Button>
                </div>
              </div>
            )}
        </div>
      </Grid>
    </div>

  );
}


