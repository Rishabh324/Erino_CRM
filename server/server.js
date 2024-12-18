const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const {connectDB} = require("./config/db");

//dot config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//swagger
// const swaggerOptions = {
//     definition: {
//         openapi: '3.0.0',  // OpenAPI version
//         info: {
//             title: 'Car Management API',
//             version: '1.0.0',
//             description: 'This is the API documentation for the Car Management application.',
//             contact: {
//             name: 'Rishabh Sinha',
//             email: 'sinharishabh402@gmail.com',
//             },
//         },
//         servers: [
//             {
//                 url: 'https://rishabh-sinha-spyneai-sde-intern.onrender.com', // Replace with your server URL
//             },
//         ],
//     },
//     apis: ['./routes/*.js'],
// }

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

// const swaggerDocs = swaggerJsdoc(swaggerOptions);

//middlewares
app.use(express.json({limit: "50mb"}));
app.use(cors(corsOptions));
app.use(morgan("dev"));

//routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));

//port
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => {
    console.log(`Node Server Running In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`);
});