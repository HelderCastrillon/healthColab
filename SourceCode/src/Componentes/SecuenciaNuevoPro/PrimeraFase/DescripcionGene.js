import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/core/styles';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

var firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/firestore");

var urlfoto = null

const useStyles = {

  input: {
    display: 'none'
  }
};

class DescripcionGene extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      nombre: "",
      descripcion: "",
      linea: "",
      author: this.props.user,
      foto: "",
      uploadValue: 0,

    }
  }
  handleValue = (e, key) => {
    if (key == "foto") {
      this.uploadIMG(e.target.files[0])


    } else {
      if (key == "linea")
        this.setState({ [key]: e.target.textContent })
      else
        this.setState({ [key]: e.target.value })
    }
  }
  clearform() {
    this.setState({ nombre: "", descripcion: "", linea: "", author: "", foto: "" })
  }

  uploadIMG(file) {


    // Create the file metadata
    var metadata = {
      contentType: 'image/jpeg'
    };
    var storage = firebase.storage();
    var storageRef = storage.ref();
    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('ForDatosGe/' + file.name).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
          uploadValue: progress
        })
        // console.log('Upload is ' + progress + '% done');

        // switch (snapshot.state) {
        //   case firebase.storage.TaskState.PAUSED: // or 'paused'
        //     console.log('Upload is paused');
        //     break;
        //   case firebase.storage.TaskState.RUNNING: // or 'running'
        //     console.log('Upload is running');
        //     break;


        // }
      }, function (error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;


          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          urlfoto = downloadURL
        });
      });


  }

  SendValue() {

    var db = firebase.firestore();
    
    var colection = this.state.nombre + "_" + Date.now();
    this.props.setCurrentProject({ nameProject: colection, descripcion: this.state.descripcion, linea: this.state.linea , author: this.state.author, foto: this.state.foto})
    this.setState({ colection });

    var docRef = db.collection("ListColections").doc(colection);
    var setAlan = docRef.set({
      "DatosGenerales": {


        nombre: this.state.nombre,
        descripcion: this.state.descripcion,
        linea: this.state.linea,
        author: this.state.author,
        foto: urlfoto

      },
      Funcionalidades: [],
      Variables: [],
      Responsables: [],
     
    });

    this.clearform()
  }
  render() {
    const { classes } = this.props;
    return (

      <Grid container={24} align='center'>
        <div>
          <br />
          <br />


          <TextField value={this.state.nombre} onChange={(e) => this.handleValue(e, "nombre")} fullWidth={true} label={"Nombre del proyecto"} />
          <TextField value={this.state.descripcion} onChange={(e) => this.handleValue(e, "descripcion")} fullWidth={true} label={"Descripcion"} multiline />


          <Autocomplete value={this.state.linea} onChange={(e) => this.handleValue(e, "linea")}

            freeSolo
            disableClearable
            options={Lineas.map(option => option.title)}
            renderInput={params => (
              <TextField
                {...params}

                label="Linea de Enfoque"
                fullWidth={true}
                InputProps={{ ...params.InputProps, type: 'search' }}
              />

            )}
          />

          <TextField value={this.state.author} onChange={(e) => this.handleValue(e, "author")} fullWidth={true} label={"Autor del proyecto"} />
          <br />

          <Input className={classes.input} id="Img" type="file" value={this.state.foto} onChange={(e) => this.handleValue(e, "foto")} fullWidth={true} label={"Imagen"} />
          <label htmlFor="Img">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          <progress value={this.state.uploadValue} max="100" ></progress>

          <br />
          <Button onClick={() => this.SendValue()} style={{ marginTop: 10 }} variant="contained" color="primary"> Guardar</Button>
        </div>
      </Grid>
    )
  }

}

// Lineas por parte de la ontologia 
const Lineas = [
  { title: 'ITS y VIH ' },
  { title: 'Maternidad Segura' },
  { title: 'Violencia de Genero' },
  { title: 'Planificación Familiar' },
  { title: 'CCU y Prostata' },
  { title: 'Uso de Metodos Anticonceptivos' },

];

export default withStyles(useStyles)(DescripcionGene);
