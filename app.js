const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const verifyjwt = require('./routes/JWTAuth');

//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

//Import Routes
const userRoutes = require('./routes/UserRoutes');
const appointmentRoutes = require('./routes/AppointmentRoutes');

app.use('/api/user', userRoutes);
app.use('/api/appointment',verifyjwt, appointmentRoutes);

app.get("/",(req,res)=>{
    res.json({
        message: "Home"
    });
});

//Connect To DB
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify:false, useCreateIndex:true}, 
    () => console.log('Successfully Connected to DB!')
);

// Listen
app.listen(5000);