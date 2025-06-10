import express from 'express';
import connectDb from './config/db.js';;
import userRoute from './routes/user.route.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser()); 
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));


// Connect to the database 
connectDb();



app.get('/', (req, res) => {
  res.send('All Working Good 💀!');
});

app.use('/api/users', userRoute);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});