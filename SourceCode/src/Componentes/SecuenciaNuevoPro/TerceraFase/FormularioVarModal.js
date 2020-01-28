import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Autocomplete from '@material-ui/lab/Autocomplete';

var firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/firestore");


class FormularioVarModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            variable: [],




        }
    }
    handleValue = (e, key) => {
        this.setState({ [key]: e.target.textContent })
    }
    clearform() {
        this.setState({ variable: [] })
    }
    SendValue() {


        var CurrentProject = this.props.CurrentProject

        if (CurrentProject["Variable"] == undefined)
            // aqui se crea el estado para colaborador y el estado de creado 
            CurrentProject["Variable"] = [{colaborador:this.props.user,variable:this.state.variable,status:"created"}]
        else
            CurrentProject["Variable"].push({colaborador:this.props.user,variable:this.state.variable,status:"created"})

        this.props.setCurrentProject(CurrentProject)
        var db = firebase.firestore();

        //console.log("nombre_project", this.props.CurrentProject.nameProject);
        var docRef = db.collection("ListColections").doc(this.props.CurrentProject.nameProject);

        var setAda = docRef.update({ "Variables": CurrentProject["Variable"] });

        this.props.handleClose()
        this.props.refreshList()
        this.clearform()

    }
    render() {
        return (
            <Grid container={24} justify="center">
                <div>


                    <Autocomplete value={this.state.variable} onChange={(e) => this.handleValue(e, "variable")}
                        freeSolo
                        disableClearable
                        options={VarVIH.map(option => option.title)}
                        style={{ width: 300 }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label="Variable"
                                InputProps={{ ...params.InputProps, type: 'search' }}
                                fullWidth />
                        )}
                    />
                    <br />
                    <br />
                    {/* <TextField value={this.state.descripcion} onChange={(e)=>this.handleValue(e,"descripcion")} fullWidth={true} label={"Descripcion"}multiline/>
            <TextField value={this.state.linea} onChange={(e)=>this.handleValue(e,"linea")} fullWidth={true} label={"Linea"} />
            <TextField value={this.state.author} onChange={(e)=>this.handleValue(e,"author")} fullWidth={true} label={"Author"} />*/}
                    <Button onClick={() => this.SendValue()} style={{ marginTop: 10 }} variant="contained" color="primary"> Guardar</Button>
                </div>
            </Grid>
        )
    }
}

const VarVIH = [

    { title: 'Documento' },
    { title: 'Nombre' },
    { title: 'Apellido' },
    { title: 'Tipo de documento' },
    { title: 'Fecha de nacimiento' },
    { title: 'Edad actual' },
    { title: 'Estado civil' },
    { title: 'Ocupación' },
    { title: 'Municipio de residencia' },
    { title: 'Teléfono' },
    { title: 'Nivel de estudio' },
    { title: 'Resguardo' },
    { title: 'Grupo étnico' },
    { title: 'Enfermedades actuales infecciosas' },
    { title: 'Código del prestador de servicios de salud' },
    { title: 'Número del NIT, cédula o pasaporte con el cual se identifique el prestador de servicios de salud para el cobro de los servicios' },
    { title: 'Código entidad administradora' },
    { title: 'Sexo' },
    { title: 'Código de consulta' },
    { title: 'Finalidad de la consulta' },
    { title: 'Código del diagnóstico principal' },
    { title: 'Código del diagnóstico relacionado No. 1' },
    { title: 'Código del diagnóstico relacionado No. 2' },
    { title: 'Código del diagnóstico relacionado No. 3' },
    { title: 'Tipo de diagnóstico principal' },
    { title: 'Fecha del procedimiento' },
    { title: 'Código del procedimiento' },
    { title: 'Finalidad del procedimiento' },
    { title: 'Ámbito de realización del procedimiento' },
    { title: 'Diagnóstico principal' },
    { title: 'Diagnóstico a la salida{' },
    { title: 'Fecha de ingreso del usuario a observación' },
    { title: 'Diagnóstico relacionado' },
    { title: 'Estado de salida' },
    { title: 'Causa básica de muerte en urgencias' },
    { title: 'Fecha de la salida del usuario en observación' },
    { title: 'Hora de la salida del usuario en observación' },
    { title: 'Número de la factura' },
    { title: 'Vía de ingreso a la institución' },
    { title: 'Diagnóstico principal de egreso' },
    { title: 'Diagnóstico de la complicación' },
    { title: 'Estado a la salida' },
    { title: 'Fecha de egreso del usuario a la institución' },
    { title: 'Hora de egreso del usuario de la institución' },
    { title: 'Tipo de identificación de la madre' },
    { title: 'Número de identificación de la madre en el Sistema' },
    { title: 'Fecha de nacimiento del recién nacido' },
    { title: 'Hora de nacimiento' },
    { title: 'Número de autorización' },
    { title: 'Código del medicamento' },
    { title: 'Tipo de medicamento' },
    { title: 'Nombre genérico del medicamento' },
    { title: 'Forma farmacéutica' },
    { title: 'Concentración del medicamento' },
    { title: 'Unidad de medida del medicamento' },
    { title: 'Número de unidades' },
    { title: 'Valor unitario de medicamento' },
    { title: 'Valor total de medicamento' },
    { title: 'Número de la factura' },
    { title: 'Número de autorización' },
    { title: 'Valor procedimiento' },
    { title: 'Valor total' },
    { title: 'Cantidad' },
    { title: 'Fecha de la remisión para el envío de los datos' },
    { title: 'Lugar Donde Ocurrió la defunción' },
    { title: 'Área donde ocurrió la defunción' },
    { title: 'Tipo de defunción' },
    { title: 'Fecha en que ocurrió la defunción' },
    { title: 'Muerte sin certificación médica' },
    { title: 'Hora en que ocurrió la defunción' },
    { title: 'Sexo del fallecido' },
    { title: 'Probable manera de muerte' },
    { title: 'Nombre y apellidos de quien certifica' },
    { title: 'Tipo de documento de identificación de quien certifica' },
    { title: 'Número de documento de identidad de quien certifica' },
    { title: 'Profesión de quien certifica' },
    { title: 'Registro profesional' },
    { title: 'Lugar y fecha de expedición del certificado' },
    { title: 'Sitio donde ocurrió la defunción' },
    { title: 'Institución de salud' },
    { title: 'Sexo del fallecido' },
    { title: 'último año de estudio que aprobó el fallecido' },
    { title: 'La ocupación pudo ser causa o estar asociada con la defunción' },
    { title: 'De acuerdo con la cultura, pueblo, rasgo físico, el fallecido era o se reconocía como' },
    { title: 'Régimen de Seguridad social' },
    { title: 'Área de residencia habitual del fallecido' },
    { title: 'Entidad Administradora de salud a la que pertenece el fallecido' },
    { title: 'Muertes violentas' },
    { title: 'Tipo de registro' },
    { title: 'Código de la EPS o de la Dirección Territorial de Salud' },
    { title: 'Fecha inicial del período de la información reportada' },
    { title: 'Fecha final del período de la información reportada' },
    { title: 'Número total de registros de detalle contenidos en el archivo' },
    { title: 'Datos de identificación' },
    { title: 'Identificación del riesgo' },
    { title: 'Actividades de intervención según el riesgo' },

];

const varMatSegura = [
    { title: 'Documento' },
    { title: 'Nombre' },
    { title: 'Apellido' },
    { title: 'Tipo de documento' },
    { title: 'Fecha de nacimiento ' },
    { title: 'Edad actual' },
    { title: 'Estado civil ' },
    { title: 'Ocupación' },
    { title: 'Municipio de residencia' },
    { title: 'Teléfono' },
    { title: 'Nivel de estudio' },
    { title: 'Resguardo' },
    { title: 'Grupo étnico' },
    { title: 'Fecha Consulta Primera Vez' },
    { title: 'Semanas de gestación al ingreso' },
    { title: 'Fecha de registro de peso y/o talla pre gestacional o I trimestral de gestación' },
    { title: 'Semanas de gestación II trimestre' },
    { title: 'Semanas de gestación III trimestre' },
    { title: 'Edad gestacional Hemoglobina' },
    { title: 'Trimestre de gestación a la toma examen' },
    { title: 'Edad gestacional grupo sanguíneo' },
    { title: 'Edad gestacional glicemia' },
    { title: 'Edad gestacional ingreso' },
    { title: 'Edad gestacional urocultivo' },
    { title: 'Fecha de asesoría lactancia materna' },
    { title: 'Fecha de remisión al ginecólogo' },
    { title: 'Fecha última cita ginecólogo' },
    { title: 'Fecha asesoría de anticoncepción ' },
    { title: 'Semanas de gestación a la consulta odontológica' },
    { title: 'Institución donde se atendió el parto o lugar específico del parto si aplica ' },
    { title: 'Profesional o persona que atiende el parto ' },
    { title: 'Nivel de complejidad de la atención de la institución que atendió el parto ' },
    { title: 'Acompañamiento por persona de confianza durante trabajo de parto ' },
    { title: 'Complicaciones postparto ' },
    { title: 'Peso al nacer por edad gestacional ' },
    { title: 'Fecha toma TSH' },
    { title: 'Resultado TSH' },
    { title: 'Fecha resultado TSH' },
    { title: 'Fecha aplicación vacuna hepatitis B2' },
    { title: 'Fecha aplicación vacuna BCG' },
    { title: 'Fecha toma TSH 2' },
    { title: 'Resultado TSH 2' },
    { title: 'Fecha aplicación vacuna BCG 2' },
    { title: 'Fecha último seguimiento' },
    { title: 'Número seguimientos teléfonos' },
    { title: 'Observación seguimiento teléfono' },
    { title: 'Fecha seguimiento por personal de salud en terreno en puerperio' },
    { title: 'Hallazgos acompañamiento personal de salud recién nacido' },
    { title: 'Inicio de lactancia materna' },
    { title: 'durante el contacto piel a piel' },
    { title: 'Otro Diagnostico Morbilidad Materna O Condición De Riesgo' },

    { title: 'Peso al nacer por edad gestacional' },
    { title: 'Hallazgo gestación seguimiento por visita domiciliaria ' },
    { title: 'Fecha identificación Gestante ' },
    { title: 'Enfermedades actuales infecciosas ' },
    { title: 'Código del prestador de servicios de salud ' },
    { title: 'Número del NIT, cédula o pasaporte con el cual se identifique el prestador de servicios de salud para el cobro de los servicios ' },
    { title: 'Código entidad administradora' },
    { title: 'Sexo' },
    { title: 'Código de consulta ' },
    { title: 'Finalidad de la consulta ' },
    { title: 'Código del diagnóstico principal ' },
    { title: 'Código del diagnóstico relacionado No. 1' },
    { title: 'Código del diagnóstico relacionado No. 2 ' },
    { title: 'Código del diagnóstico relacionado No. 3 ' },
    { title: 'Tipo de diagnóstico principal' },
    { title: 'Fecha del procedimiento ' },
    { title: 'Código del procedimiento ' },
    { title: 'Finalidad del procedimiento ' },
    { title: 'Ámbito de realización del procedimiento ' },
    { title: 'Diagnóstico principal ' },
    { title: 'Diagnóstico relacionado ' },
    { title: 'Fecha de ingreso del usuario a observación ' },
    { title: 'Diagnóstico a la salida ' },
    { title: 'Estado de salida ' },
    { title: 'Causa básica de muerte en urgencias ' },
    { title: 'Fecha de la salida del usuario en observación ' },
    { title: 'Hora de la salida del usuario en observación ' },
    { title: 'Número de la factura ' },
    { title: 'Vía de ingreso a la institución ' },
    { title: 'diagnóstico principal de egreso ' },
    { title: 'Diagnóstico de la complicación ' },
    { title: 'Estado a la salida ' },
    { title: 'Fecha de egreso del usuario a la institución ' },
    { title: 'Hora de egreso del usuario de la institución ' },
    { title: 'Tipo de identificación de la madre ' },
    { title: 'Número de identificación de la madre en el Sistema ' },
    { title: 'Fecha de nacimiento del recién nacido ' },
    { title: 'Hora de nacimiento ' },
    { title: 'Número de autorización ' },
    { title: 'Código del medicamento ' },
    { title: 'Tipo de medicamento ' },
    { title: 'Nombre genérico del medicamento ' },
    { title: 'Forma farmacéutica ' },
    { title: 'Concentración del medicamento ' },
    { title: 'Unidad de medida del medicamento ' },
    { title: 'Número de unidades ' },
    { title: 'Valor unitario de medicamento' },
    { title: 'Valor total de medicamento' },
    { title: 'Número de la factura' },
    { title: 'Número de autorización' },
    { title: 'Valor procedimiento' },
    { title: 'Valor total' },
    { title: 'Cantidad' },
    { title: 'Fecha de la remisión para el envío de los datos' },
    { title: 'Nombre y apellidos de la madre - defunción fetal' },
    { title: 'Tipo de documento de identificación de la madre - defuncion fetal' },
    { title: 'Edad de la madre' },
    { title: 'Número de hijos vivos y nacidos muertos de la madres' },
    { title: 'Defunción de mujeres en edad fértil' },
    { title: 'Muerte sin certificación médica' },
    { title: 'Lugar Donde Ocurrió la defunción' },
    { title: 'Área donde ocurrió la defunción' },
    { title: 'Tipo de defunción' },
    { title: 'Fecha en que ocurrió la defunción' },
    { title: 'Hora en que ocurrió la defunción' },
    { title: 'Sexo del fallecido' },
    { title: 'Probable manera de muerte' },
    { title: 'Nombre y apellidos de quien certifica' },
    { title: 'Tipo de documento de identificación de quien certifica' },
    { title: 'Número de documento de identidad de quien certifica' },
    { title: 'Profesión de quien certifica' },
    { title: 'Registro profesional' },
    { title: 'Lugar y fecha de expedición del certificado' },
    { title: 'Sitio donde ocurrió la defunción' },
    { title: 'Institución de salud' },
    { title: 'Sexo del fallecido' },
    { title: 'último año de estudio que aprobó el fallecido' },
    { title: 'La ocupación pudo ser causa o estar asociada con la defunción' },
    { title: 'De acuerdo con la cultura,  pueblo, rasgo físico, el fallecido era o se reconocía como ' },
    { title: 'Régimen de Seguridad social' },
    { title: 'Área de residencia habitual del fallecido' },
    { title: 'Entidad Administradora de salud a la que pertenece el fallecido' },
    { title: 'Muertes violentas' },
    { title: 'Tipo de registro' },
    { title: 'Código de la EPS o de la  Dirección Territorial de Salud' },
    { title: 'Fecha inicial del período de la información reportada' },
    { title: 'Fecha final del período de la información reportada' },
    { title: 'Número total de registros de detalle contenidos en el archivo' },
    { title: 'Datos de identificación' },
    { title: 'Identificación del riesgo' },
    { title: 'Actividades de intervención según el riesgo' },


];

export default FormularioVarModal
