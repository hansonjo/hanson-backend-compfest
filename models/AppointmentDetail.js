const mongoose = require('mongoose');

const AppointmentDetailSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    appointment_id: {type: String, required: true}
})

module.exports = mongoose.model('AppointmentDetail', AppointmentDetailSchema);