require('dotenv').config();
const express = require('express');
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const gadgetRoutes = require('./routes/gadgetRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const {connectDB}  =require('./config/prisma')

connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/gadgets', gadgetRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));