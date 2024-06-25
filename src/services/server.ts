import express from 'express';
import { connectToDatabase } from '../config/database'; // Đường dẫn đến file database.ts

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/test-mongo', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('example-collection'); // Thay 'example-collection' bằng tên collection của bạn
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to MongoDB', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
