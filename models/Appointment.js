const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: {type: String, required: true},
    list: {type: Array}
})

module.exports = mongoose.model('Appointment', AppointmentSchema);