const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const AppointmentDetail = require('../models/AppointmentDetail');

function createForm(req){
    let form = {
        name: req.body.name,
        description: req.body.description
    }

    return form;
}

// Index
router.get('/', async (req, res) => {
    try{
        let appointments = await Appointment.find();
        const getList = appointment => {
            return getPatientList(appointment._id);
        }

        for(let appointment of appointments){
            const list = await getList(appointment);
            await appointment.list.push(list);
        }
        res.json(appointments);
    } catch(err){
        res.status(400).json({message : err});
    }
});


// Create
router.post('/create', async (req, res) => {
    const appointment = new Appointment(createForm(req));

    try{
        const savedPost = await appointment.save();
        res.json(savedPost);
    } catch(err){
        res.status(400).json({message : err});
    }
});

// Find By ID
router.get('/find/:postId', async (req,res) => {
    try{
        const appointment = await Appointment.findById(req.params.postId);
        res.json(appointment);
    } catch(err){
        res.status(400).json({message : 'id not found'});
    }
})

// Delete
router.delete('/delete/:postId', async (req,res) => {
    try{
        const remove = await Appointment.remove({_id : req.params.postId});
        res.json({message: 'Succesfully Delete Appointment'});
    } catch(err){
        res.status(400).json({message : 'id not found'});
    }
})

// Update
router.patch('/update/:postId', async (req,res) => {
    try{
        const update = await Appointment.updateOne(
            {_id : req.params.postId}, 
            { $set: createForm(req) }
        );
        res.json({message: 'Succesfully Update Appointment'});
    } catch(err){
        res.status(400).json({message : err});
    }
})

// Apply
router.post('/apply/:postId', async (req, res) => {

    const appointment = new AppointmentDetail(
        {
            user_id: req.user,
            appointment_id: req.params.postId
        }
    );

    try{
        const savedPost = await appointment.save();
        res.json(savedPost);
    } catch(err){
        res.status(400).json({message : err});
    }
});

// Cancel
router.delete('/cancel/:postId', async (req, res) => {
    try{
        const remove = await AppointmentDetail.remove({appointment_id : req.params.postId, user_id : req.user});
        res.json({message: 'Succesfully Cancel Appointment'});
    } catch(err){
        res.status(400).json({message : 'id not found'});
    }
});

async function getPatientList(id){
    try{
        const appointments = await AppointmentDetail.find({appointment_id: id});
        return appointments;
    }catch(err){
        return [];
    }
}

module.exports = router;