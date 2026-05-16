require("dotenv").config();
const express = require("express");
const cors = require("cors");
//app config
const app = express();
const port=process.env.PORT || 5800
const connectdb = require("./configs/db");
// Connect Database
connectdb();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Trust the first proxy for rate limiting
app.set('trust proxy', 1);

// Routes
const userrouter = require('./routes/userRoutes');
const resumerouter=require('./routes/resumeroutes');
const airouter=require('./routes/airoutes')
const paymentrouter=require('./routes/paymentroutes')
const contactrouter=require('./routes/contactRoutes')
app.use('/api/users', userrouter); //this sets the prefix for the userroutes
app.use('/api/resumes',resumerouter)
app.use('/api/ai',airouter)
app.use('/api/payment',paymentrouter)
app.use('/api/contact',contactrouter)
app.get('/', (req, res) => {
    res.send("Api is working");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});