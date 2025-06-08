import express from 'express';
import connectDb from './config/db.js';;


const app = express();
const PORT = process.env.PORT || 3000;

connectDb();

app.get('/', (req, res) => {
  res.send('All Working Good 💀!');
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});