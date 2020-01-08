//const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

//Se crea la Schema con los campos que va a tener el formulario.
const pacientesSchema = schema({
    nombreCompleto: String,
    fechaNacimiento: String,
    sexo: String,
    regimen: String,
    urgencia: Boolean,
    remitido: Boolean,
    reingreso: Boolean,
    tIdentificacion: String,
    nIdentificacion: Number,
    expedicion: String,
    estadoCivil: String,
    grupoSanguineo: String,
    pais: String,
    departamento: String,
    municipio: String,
    localidad: String,
    direccion: String,
    ocupacion: String,
    celular: Number,
    telefono: Number,
    email: String, 
    barrio: String,
    asegurador: String,
    causaExterna: String,
    mConsulta: String, // Motivo de la consulta.
    eActual: String, // Enfermedad Actual
    diagnostico: String,
    triage: String,
    admitido: String
}, {
    timestamps: true //Guarda la fecha de cración o modificación de la Schema.
});

const pacientes = mongoose.model('pacientes', pacientesSchema);

module.exports = pacientes;