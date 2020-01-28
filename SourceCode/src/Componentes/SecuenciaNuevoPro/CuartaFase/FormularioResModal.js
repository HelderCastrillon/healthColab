import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Autocomplete from '@material-ui/lab/Autocomplete';

var firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/firestore");


const respon = [
    { title: 'Hospital Toribio Maya ' },
    { title: 'Hospital Susana Lopez de Valencia' },
    { title: 'Hospital Universitario de Popayán (San José)' },
    { title: 'Clinica la Estancía' },
    { title: 'Clinica Santa Gracia' },

];



class FormularioResModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            responsable: [],


        }
    }
    handleValue = (e, key) => {
        this.setState({ [key]: e.target.textContent })
    }
    clearform() {
        this.setState({ Responsable: [] })
    }
    SendValue() {
        var CurrentProject = this.props.CurrentProject

        if (CurrentProject["Responsable"] == undefined)
            CurrentProject["Responsable"] = [{ colaborador:this.props.user,responsable:this.state.responsable,status:"created"}]
        else
            CurrentProject["Responsable"].push({colaborador:this.props.user,responsable:this.state.responsable,status:"created"})


        this.props.setCurrentProject(CurrentProject)
        var db = firebase.firestore();

        var docRef = db.collection("ListColections").doc(this.props.CurrentProject.nameProject);

        var setAda = docRef.update({ "Responsables": CurrentProject["Responsable"] });

        this.props.handleClose()
        this.props.refreshList()
        this.clearform()



    }
    render() {
        return (
            <Grid container={24} justify="center" >
                <div>
                    {/* <TextField value={this.state.responsable1} onChange={(e)=>this.handleValue(e,"responsable1")} fullWidth={true} label={"Responsable 1"}/>
            <TextField value={this.state.descripcion} onChange={(e)=>this.handleValue(e,"descripcion")} fullWidth={true} label={"Descripcion"}multiline/> *
            <TextField value={this.state.linea} onChange={(e)=>this.handleValue(e,"linea")} fullWidth={true} label={"Linea"} />
            <TextField value={this.state.author} onChange={(e)=>this.handleValue(e,"author")} fullWidth={true} label={"Author"} />*/}
                    <Autocomplete value={this.state.responsable} onChange={(e) => this.handleValue(e, "responsable")}
                        freeSolo
                        disableClearable
                        options={respon.map(option => option.title)}
                        style={{ width: 300 }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label="Responsables"
                                InputProps={{ ...params.InputProps, type: 'search' }}
                                fullWidth />
                        )}
                    />
                    <br />
                    <br />

                    <Button onClick={() => this.SendValue()} style={{ marginTop: 10 }} variant="contained" color="primary"> Guardar</Button>
                </div>
            </Grid>
        )
    }
}
export default FormularioResModal
