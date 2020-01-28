import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Autocomplete from '@material-ui/lab/Autocomplete';

var firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/firestore");
 

class FormularioModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            funcionalidad: [],
              
          
        }
    }
    handleValue = (e, key) => {
        this.setState({ [key]: e.target.textContent })

    }
    clearform() {
        this.setState({ funcionalidad: [] })
    }
    SendValue() {
             
        var  CurrentProject = this.props.CurrentProject

        if(CurrentProject["Funcionalidad"]==undefined)
        // aqui se crea el estado para colaborador y el estado de creado 
            CurrentProject["Funcionalidad"] = [{colaborador:this.props.user,funcionalidad:this.state.funcionalidad,status:"created"}]
        else
              CurrentProject["Funcionalidad"].push({colaborador:this.props.user,funcionalidad:this.state.funcionalidad,status:"created"})
        
        this.props.setCurrentProject(CurrentProject)
        var db = firebase.firestore();

        // console.log("nombre_project", this.props.CurrentProject.nameProject);

        var docRef = db.collection("ListColections").doc(this.props.CurrentProject.nameProject);
        
        var setAda = docRef.update({"Funcionalidades":CurrentProject["Funcionalidad"]});
            
        this.props.handleClose()
        this.props.refreshList()
        this.clearform()
    }
    render() {
        return (
            <Grid container={24} justify="center">
                <div>


                    <Autocomplete value={this.state.funcionalidad} onChange={(e) => this.handleValue(e, "funcionalidad")}

                        freeSolo
                        disableClearable
                        options={Funtions.map(option => option.title)}
                        style={{ width: 300 }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label="Funcionalidad"
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

const Funtions = [
    { title: 'Criterios generales' },
    { title: 'Administrar historial clínico' },
    { title: 'Gestionar alergia, intolerancia y lista de reacciones adversas' },
    { title: 'Administrar lista de medicamentos' },
    { title: 'Gestionar lista de problemas' },
    { title: 'Administrar la lista de factores relacionados con la salud' },
    { title: 'Administrar la lista de vacunas' },
    { title: 'Administrar equipos médicos, prótesis / ortesis, lista de dispositivos' },
    { title: 'Gestionar las preferencias de pacientes y familiares' },
    { title: 'Gestionar eventos adversos' },
    { title: 'Renderizar información de fuentes externas' },
    { title: 'Renderizar documentos clínicos de origen externo' },
    { title: 'Renderizar datos de origen externo' },
    { title: 'Renderizar datos originados del sistema médico de emergencia' },
    { title: 'Renderizar imágenes clínicas de origen externo' },
    { title: 'Administrar datos originados por el paciente' },
    { title: 'Gestionar documentación clínica' },
    { title: 'Evaluaciones de conducta' },
    { title: 'Gestionar mediciones clínicas del paciente' },
    { title: 'Gestionar documentos clínicos y notas' },
    { title: 'Gestionar planes de atención y tratamiento específicos para el paciente' },
    { title: 'Reconocer / modificar la documentación de otro proveedor' },
    { title: 'Gestionar pedidos' },
    { title: 'Usar conjuntos de órdenes' },
    { title: 'Administrar pedidos de medicamentos' },
    { title: 'Control de interacciones de medicamentos y alergias' },
    { title: 'Dosificación y advertencias de medicamentos específicos del paciente' },
    { title: 'Eficiencias de la orden de medicación' },
    { title: 'Anulaciones de alerta de medicación' },
    { title: 'Gestionar pedidos de atención al paciente sin medicamentos' },
    { title: 'Gestionar pedidos para pruebas de diagnóstico' },
    { title: 'Gestionar pedidos de productos sanguíneos y otros productos biológicos' },
    { title: 'Gestionar pedidos de referencia' },
    { title: 'Gestionar resultados' },
    { title: 'Gestionar resultados de pruebas de diagnóstico' },
    { title: 'Administrar la administración de medicamentos, inmunizaciones y tratamientos' },
    { title: 'Administrar la administración de medicamentos' },
    { title: 'Administrar la administración de vacunas' },
    { title: 'Administrar administración de tratamiento' },
    { title: 'Gestionar la atención futura' },
    { title: 'Pautas y protocolos actuales para planificar la atención' },
    { title: 'Administrar recomendaciones para el cuidado futuro' },
    { title: 'Gestionar la educación y comunicación del paciente' },
    { title: 'Generar, registrar y distribuir instrucciones específicas del paciente' },
    { title: 'Administre la coordinación e informes de atención' },
    { title: 'Producir un registro resumido de la atención' },
    { title: 'Capturar información del informe del servicio de salud' },
    { title: 'Gestión de registros' },
    { title: 'Administrar un registro de paciente' },

    //las primeras 50 funcionalidades  

    { title: 'Gestionar la demografía del paciente' },
    { title: 'Capturar registro rápido' },
    { title: 'Solicitud de referencia de captura' },
    { title: 'Gestionar encuentro con pacientes' },
    { title: 'Sujeto a relación de sujeto' },
    { title: 'Relacionado por Genealogía' },
    { title: 'Relacionado por el seguro' },
    { title: 'Relacionado por la situación de vida' },
    { title: 'Relacionado por otros medios' },
    { title: 'Preferencias, Directivas, Consentimientos y Autorizaciones' },
    { title: 'Apoyo a las preferencias de pacientes y familiares' },
    { title: 'Administrar instrucciones anticipadas para pacientes' },
    { title: 'Gestionar consentimientos y autorizaciones' },
    { title: 'Soporte de información de origen externo' },
    { title: 'Soporte de documentos clínicos de origen externo' },
    { title: 'Admite datos clínicos de origen externo' },
    { title: 'Soporte de datos originados por el sistema médico de emergencia' },
    { title: 'Admite imágenes clínicas de origen externo' },
    { title: 'Soporte de datos originados por el paciente' },
    { title: 'Respaldar los datos de salud del paciente derivados de datos y documentación' },
    { title: 'administrativa y financiera' },
    { title: 'Datos de pacientes de soporte derivados de la elegibilidad, el formulario y la documentación de beneficios para la prescripción electrónica independiente' },
    { title: 'Soporte de datos originados en dispositivos médicos' },
    { title: 'Documentación clínica de soporte' },
    { title: 'Soporte para evaluaciones estándar' },
    { title: 'Apoyo para evaluaciones conducidas por el contexto del paciente' },
    { title: 'Soporte para planes de atención estándar, pautas, protocolos' },
    { title: 'Soporte para planes, pautas y protocolos de atención sensibles al contexto' },
    { title: 'Apoyo a los protocolos de investigación relacionados con la atención individual del paciente' },
    { title: 'Apoyo el autocuidado' },
    { title: 'Pautas y estándares de captura de fuentes externas' },
    { title: 'Gestionar la documentación de la respuesta del médico a las indicaciones de apoyo a la decisión' },
    { title: 'Actualización de las pautas del sistema de soporte de decisiones clínicas' },
    { title: 'Apoyo para la identificación de posibles problemas y tendencias' },
    { title: 'Apoyo la documentación de otros encuentros y episodios de atención' },
    { title: 'Gestionar la calidad del registro de información de salud' },
    { title: 'Órdenes de soporte' },
    { title: 'Administrar plantillas de conjunto de pedidos' },
    { title: 'Soporte para pedidos de medicamentos e inmunización' },
    { title: 'Soporte para la interacción de medicamentos y el control de alergias' },
    { title: 'Soporte para dosis y advertencias específicas del paciente' },
    { title: 'Soporte para la eficiencia de pedidos de medicamentos' },
    { title: 'Soporte para recomendaciones de medicación' },
    { title: 'Apoyo para la reconciliación de medicamentos' },
    { title: 'Soporte para pedidos sin medicamentos' },
    { title: 'Órdenes de soporte para pruebas de diagnóstico' },
    { title: 'Órdenes de soporte para productos sanguíneos y otros productos biológicos' },
    { title: 'Soporte para referencias' },
    { title: 'Apoyo para el proceso de referencia' },
    { title: 'Soporte para recomendaciones de referencias' },
    { title: 'Soporte para pedidos de referencias electrónicas' },

    //100 Funcionalidades

    { title: 'Apoyo a los resultados' },
    { title: 'Administración de tratamiento de apoyo' },
    { title: 'Apoyo para la administración de medicamentos' },
    { title: 'Apoyo a la Administración de Inmunizaciones' },
    { title: 'Apoyo para la administración segura de sangre' },
    { title: 'Soporte para la recogida precisa de muestras' },
    { title: 'Apoyo la atención futura' },
    { title: 'Acceda a la guía de atención médica' },
    { title: 'Apoyo a la educación y comunicación del paciente' },
    { title: 'Acceso al conocimiento del paciente' },
    { title: 'Actualizaciones de material educativo para pacientes' },
    { title: 'Actualizaciones de información de recordatorio del paciente' },
    { title: 'Soporte para comunicaciones entre el proveedor y el paciente y / o el representante del paciente' },
    { title: 'Educación para pacientes, familiares y cuidadores' },
    { title: 'Comunicación con sistemas de registros de salud personal' },
    { title: 'Coordinación e informes de atención de apoyo' },
    { title: 'Gestión y soporte de comunicación clínica' },
    { title: 'Soporte para la comunicación entre proveedores' },
    { title: 'Gestionar solicitudes de consulta y respuestas' },
    { title: 'Apoyo al proveedor para la comunicación profesional' },
    { title: 'Apoyo a la comunicación entre proveedores y farmacias' },
    { title: 'Resultado del registro de salud' },
    { title: 'Generación de informes estándar' },
    { title: 'Consulta ad hoc y renderizado' },
    { title: 'Vista de información' },
    { title: 'Administrar ayuda para el usuario' },
    { title: 'Apoyo para el mantenimiento de la salud, cuidado preventivo y bienestar' },
    { title: 'Alertas actuales para servicios preventivos y bienestar' },
    { title: 'Presentar notificaciones y recordatorios para servicios preventivos y bienestar' },
    { title: 'Apoyar la investigación epidemiológica basada en la población' },
    { title: 'Soporte para la recopilación de datos de investigación epidemiológica' },
    { title: 'Soporte para análisis de datos epidemiológicos' },
    { title: 'Soporte para compartir datos de cohortes y agregados' },
    { title: 'Soporte para notificaciones y respuestas' },
    { title: 'Soporte para monitorear notificaciones de respuesta con respecto a la salud de un paciente específico' },
    { title: 'Apoyo de gestión de donantes' },
    { title: 'Medición, Análisis, Investigación e Informes' },
    { title: 'Medidas de resultado y análisis' },
    { title: 'Medidas de rendimiento y rendición de cuentas' },
    { title: 'Apoyo a la mejora de procesos' },
    { title: 'Compatibilidad con los indicadores de rendimiento del sistema de atención (paneles)' },
    { title: 'Actualizaciones relacionadas con la salud pública' },
    { title: 'Gestión de solicitud de datos desidentificados' },
    { title: 'Apoyar la gestión de salud consistente de grupos de pacientes o poblaciones' },
    { title: 'Gestionar identificadores relacionados con el estudio de salud de la población' },
    { title: 'Administrar información del proveedor' },
    { title: 'Administrar registro o directorio de proveedores' },
    { title: 'Gestionar la ubicación del proveedor dentro de la instalación' },
    { title: 'Ubicación de la llamada del proveedor' },
    { title: 'Administrar la (s) ubicación (es) u oficina (s) del proveedor' },

    //150 Funcionalidades 

    { title: 'Registro o directorio de equipo / grupo de proveedores' },
    { title: 'Proveedor de casos / panel' },
    { title: 'Gestionar las relaciones entre profesionales y pacientes' },
    { title: 'Administre la demografía del paciente, la ubicación y la sincronización' },
    { title: 'Sincronizar datos demográficos del paciente' },
    { title: 'Administrar la ubicación del paciente dentro de una instalación' },
    { title: 'Gestionar la residencia del paciente para la prestación y administración de servicios' },
    { title: 'Administrar asignación de cama del paciente' },
    { title: 'Administrar directivas de consentimiento de privacidad del paciente' },
    { title: 'Administrar la interacción del registro de salud personal' },
    { title: 'Gestionar el intercambio de información con el paciente PHR' },
    { title: 'Administre archivos PHR legales y otros relacionados' },
    { title: 'Gestionar consentimientos y autorizaciones desde un PHR' },
    { title: 'Administre los documentos de fin de vida útil de PHR y otras directivas anticipadas' },
    { title: 'Gestionar comunicación' },
    { title: 'Administrar la comunicación del registro' },
    { title: 'Soporte para comunicaciones dentro de una organización' },
    { title: 'Apoyo a las comunicaciones entre organizaciones' },
    { title: 'Soporte para comunicaciones proveedor-empleador' },
    { title: 'Gestionar tareas de flujo de trabajo clínico' },
    { title: 'Creación de tareas clínicas, asignación y enrutamiento' },
    { title: 'Asignación de tareas clínicas y enrutamiento para la administración y administración de medicamentos' },
    { title: 'Enlace de tareas clínicas' },
    { title: 'Seguimiento del estado de la tarea clínica' },
    { title: 'Administrar disponibilidad de recursos' },
    { title: 'Gestionar la demografía de las instalaciones' },
    { title: 'Gestionar la información de disponibilidad de recursos sanitarios' },
    { title: 'Gestionar la programación de recursos sanitarios' },
    { title: 'Categorización de clasificación de soporte' },
    { title: 'Apoyo a la gestión de la sala de espera' },
    { title: 'Apoyo la determinación de la agudeza y la gravedad del paciente' },
    { title: 'Encuentro de apoyo / Episodio de gestión de la atención' },
    { title: 'Administrar filtros de presentación' },
    { title: 'Documentación de encuentro de soporte' },
    { title: 'Apoyo a la información financiera' },
    { title: 'Apoyar los servicios de atención médica remota' },
    { title: 'Gestionar transiciones de atención y pacientes dados de alta' },
    { title: 'Gestionar el acceso a la información para uso complementario' },
    { title: 'Soporte de codificación clínica basada en reglas' },
    { title: 'Soporte de codificación financiera y administrativa basada en reglas' },
    { title: 'Apoyar la integración de información financiera / de costos en la atención al paciente' },
    { title: 'Gestionar la información de rendimiento de las instalaciones sanitarias' },
    { title: 'Soporte para capacitación de proveedores' },
    { title: 'Gestionar el procesamiento de transacciones administrativas' },
    { title: 'Apoyar la inscripción en el plan financiero' },
    { title: 'Apoyar la verificación de elegibilidad financiera' },
    { title: 'Autorizaciones de servicio de soporte' },
    { title: 'Solicitudes y reclamos de servicio de soporte' },
    { title: 'Respaldar reclamos financieros e informes de encuentros' },

    //200 Funcionalidades 

    { title: 'Registro de ciclo de vida y vida útil' },
    { title: 'Grabar ciclo de vida' },
    { title: 'Originar y retener registro de entrada' },
    { title: 'Evidencia de registro de entrada originar / retener evento' },
    { title: 'Modificar contenido de entrada de registro' },
    { title: 'Evidencia de evento de modificación de entrada de registro' },
    { title: 'Traducir contenido de entrada de registro' },
    { title: 'Evidencia de entrada de registro Traducir evento' },
    { title: 'Atestiguar el contenido de la entrada de registro' },
    { title: 'Evidencia de evento de certificación de entrada de registro' },
    { title: 'Ver / acceder al contenido de la entrada de registro' },
    { title: 'Evidencia de evento de acceso / vista de entrada de registro' },
    { title: 'Contenido de entrada de registro de salida / informe' },
    { title: 'Evidencia de registro de entrada de salida / informe de evento' },
    { title: 'Divulgar contenido de entrada de registro' },
    { title: 'Evidencia de evento de divulgación de entrada de registro' },
    { title: 'Transmitir contenido de entrada de registro' },
    { title: 'Evidencia de evento de transmisión de entrada de registro' },
    { title: 'Recibir y retener entradas de registros' },
    { title: 'Evidencia de registro de entrada Recibir / Retener evento' },
    { title: 'Desidentificar entradas de registro' },
    { title: 'Prueba de evento de desidentificación de entrada de registro' },
    { title: 'Pseudominizar entradas de registro' },
    { title: 'Evidencia de registro de evento de seudominización de entrada' },
    { title: 'Vuelva a identificar las entradas de registro' },
    { title: 'Volver a identificar el desencadenador de auditoría de entrada de registro' },
    { title: 'Extraer contenido de entrada de registro' },
    { title: 'Evidencia de evento de extracción de entrada de registro' },
    { title: 'Entradas de registro de archivo' },
    { title: 'Evidencia de evento de archivo de entrada de registro' },
    { title: 'Restaurar entradas de registro (archivadas previamente)' },
    { title: 'Evidencia de evento de restauración de entrada de registro' },
    { title: 'Destruya o identifique entradas de registro como faltantes' },
    { title: 'Evidencia de evento de destrucción de entrada de registro' },
    { title: 'Desaprobar / retraer entradas de registro' },
    { title: 'Evidencia de evento de desaprobación / retracción de entrada de registro' },
    { title: 'Reactivar entradas de registro' },
    { title: 'Evidencia de evento de reactivación de registro de entrada' },
    { title: 'Fusionar entradas de registro' },
    { title: 'Evidencia de evento de combinación de entrada de registro' },
    { title: 'Desunir entradas de registro' },
    { title: 'Evidencia de entrada de registro Evento de fusión' },
    { title: 'Entradas de registro de enlace' },
    { title: 'Evidencia de evento de enlace de entrada de registro' },
    { title: 'Desvincular entradas de registro' },
    { title: 'Evidencia de entrada de registro Desvincular evento' },
    { title: 'Colocar registros en espera legal' },
    { title: 'Prueba de entrada de registro Evento de retención legal' },
    { title: 'Liberar entradas de registro de retención legal' },
    { title: 'Eliminar la retención legal en el desencadenador de auditoría de entrada de registro' },

    //250 Funcionalidades 

    { title: 'Vida útil récord' },
    { title: 'Administrar entradas de registro' },
    { title: 'Gestionar entradas de registros para retención legal' },
    { title: 'Estados de registro' },
    { title: 'Administrar estado pendiente de registro' },
    { title: 'Gestionar entrada de registro Estado modificado, corregido y aumentado' },
    { title: 'Gestionar la sucesión de entradas de registros y el control de versiones' },
    { title: 'Gestionar retracción de entrada de registro' },
    { title: 'Completar registro' },
    { title: 'Grabar Sincronización' },
    { title: 'Grabar Archivo y Restaurar' },
    { title: 'Seguridad' },
    { title: 'Autenticación de entidad' },
    { title: 'Autorización de entidad' },
    { title: 'Control de acceso a la entidad' },
    { title: 'Control de acceso de eemergencia' },
    { title: 'Control de acceso de pacientes' },
    { title: 'No repudio' },
    { title: 'Intercambio seguro de datos' },
    { title: 'Enrutamiento seguro de datos' },
    { title: 'Privacidad y confidencialidad del paciente' },
    { title: 'Redacte la información de identificación del paciente' },
    { title: 'Proteger la identidad del paciente individual' },
    { title: 'Mediciones de operación del sistema' },
    { title: 'Servicio disponible' },
    { title: 'Entorno de intercambio de información confiable' },
    { title: 'Auditoría' },
    { title: 'Disparadores de auditoría' },
    { title: 'Disparadores de auditoría de registro de entrada' },
    { title: 'Disparadores de auditoría de seguridad' },
    { title: 'Activador de auditoría de seguridad de eventos de seguridad' },
    { title: 'Autenticación de usuario en el sistema (Iniciar sesión de usuario) Disparador de auditoría de seguridad' },
    { title: 'Autenticación de usuario (solicitud del sistema para cambio de contraseña) Disparador de auditoría de seguridad' },
    { title: 'Solicitud de usuario para cambiar el desencadenador de auditoría de seguridad de contraseña' },
    { title: 'Cierre de sesión de usuario (sesión de usuario final) Disparador de auditoría de seguridad' },
    { title: 'Disparador de auditoría de seguridad de acceso de usuario (correcto)' },
    { title: 'Intentos del usuario para acceder a los datos (sin éxito: acceso denegado) Disparador de auditoría de seguridad' },
    { title: 'Disparador de auditoría de seguridad de acceso de usuario extraordinario (Break the Glass)' },
    { title: 'Activación de auditoría de seguridad de permisos de usuario (autorización)' },
    { title: 'Disparadores de auditoría del sistema' },
    { title: 'Sistema Evento Disparador de auditoría del sistema' },
    { title: 'Sistema iniciado Disparador de auditoría del sistema' },
    { title: 'Copia de seguridad del iniciador de auditoría del sistema iniciado' },
    { title: 'Copia de seguridad del disparador de auditoría del sistema completado' },
    { title: 'Disparo de auditoría de sistema iniciado de recuperación de copia de seguridad' },
    { title: 'Activación de la auditoría del sistema de recuperación de copia de seguridad completada' },
    { title: 'Disparo de auditoría de sistema iniciado por trabajo por lotes' },
    { title: 'Disparo de auditoría de sistema de trabajo completado por lotes' },
    { title: 'Mantenimiento iniciado disparador de auditoría del sistema' },
    { title: 'Mantenimiento completo del disparador de auditoría del sistema' },

    //300 Funcionalidades

    { title: 'Disparador de auditoría del sistema de uso de recursos' },
    { title: 'Eventos de mantenimiento del sistema - Disparador de auditoría del sistema de acceso local' },
    { title: 'Eventos de mantenimiento del sistema: disparador de auditoría del sistema de acceso remoto' },
    { title: 'Mantenimiento del sistema - EHR o disparador de auditoría del sistema de software clínico' },
    { title: 'Mantenimiento del sistema - Códigos, vocabulario, conocimiento, reglas Disparador de auditoría del sistema' },
    { title: 'Disparador de auditoría del sistema de corrupción de datos' },
    { title: 'Disparadores de auditoría clínica' },
    { title: 'Alertas clínicas Disparador de auditoría clínica' },
    { title: 'Agradecimientos de cambios clínicamente significativos en el informe Disparador de auditoría clínica' },
    { title: 'Desactivar alertas de soporte de decisiones Disparador de auditoría clínica' },
    { title: 'Gestión de registro de auditoría' },
    { title: 'Registro de Auditoría Indelebilidad' },
    { title: 'Notificación de auditoría y revisión' },
    { title: 'Servicios de registro y directorio' },
    { title: 'Terminología estándar y servicios terminológicos' },
    { title: 'Terminología estándar y modelos terminológicos' },
    { title: 'Mantenimiento y versiones de terminologías estándar' },
    { title: 'Mapeo de terminología' },
    { title: 'Interoperabilidad basada en estándares' },
    { title: 'Aplicación y estándares de intercambio de documentos estructurados' },
    { title: 'Normas de intercambio de aplicaciones' },
    { title: 'Estándares de intercambio de documentos estructurados' },
    { title: 'Versiones y mantenimiento de estándares de intercambio' },
    { title: 'Integración de aplicaciones basadas en estándares' },
    { title: 'Acuerdos de intercambio' },
    { title: 'Integración de sistema' },
    { title: 'Gestión de normas comerciales' },
    { title: 'Gestión de flujo de trabajo' },
    { title: 'Copia de seguridad y recuperación de bases de datos' },
    { title: 'Operaciones de gestión del sistema y rendimiento' },


    //330 Funcionales 

];


export default FormularioModal
