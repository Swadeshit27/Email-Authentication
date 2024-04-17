import express from 'express';
import dotenv from 'dotenv'
import cors from "cors"
import { v2 as cloudinary } from 'cloudinary'
import { connectDB } from './db';
import authRoute from "./routers/user.router"


dotenv.config()
const app = express();
const port = process.env.PORT || 3000
connectDB();
// configure middlewares
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static("public"))
app.use(cors())
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.get('/', (req, res) => { 
  res.send('Hello World!');
}); 
app.use('/auth', authRoute)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});