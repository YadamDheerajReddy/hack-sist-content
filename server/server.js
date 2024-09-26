// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/hackSIST-content', { useNewUrlParser: true, useUnifiedTopology: true });

// const userSchema = new mongoose.Schema({
//   fullName: String,
//   email: { type: String, unique: true },
//   phoneNumber: String,
//   yearOfStudy: String,
//   department: String,
//   previousExperience: String,
//   writingSamples: String,
//   whyContentLead: String,
//   newIdeas: String,
// });

// const User = mongoose.model('User', userSchema);

// // Get the current registration count
// app.get('/api/registration-count', async (req, res) => {
//   try {
//     const registrationCount = await User.countDocuments();
//     res.status(200).json({ count: registrationCount });
//   } catch (error) {
//     res.status(500).send('Error fetching registration count');
//   }
// });

// // Register new user with a registration limit of 20
// app.post('/api/register', async (req, res) => {
//   const { email } = req.body;
//   try {
//     // Check if the registration count is less than 20
//     const registrationCount = await User.countDocuments();
//     if (registrationCount >= 20) {
//       return res.status(403).send('Registration limit of 20 has been reached');
//     }

//     // Check if the email is already registered
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).send('Email already registered');
//     }

//     // If the limit hasn't been reached, proceed with the registration
//     const newUser = new User(req.body);
//     await newUser.save();
//     res.status(201).send('User registered successfully');
//   } catch (error) {
//     res.status(500).send('Server error');
//   }
// });

// // Start the server
// app.listen(5000, () => {
//   console.log('Server running on port 5000');
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());

// Enable CORS and specify the frontend URL (for Vercel)
app.use(cors({
  origin: ['https://your-frontend.vercel.app'],  // Replace with your Vercel frontend URL
}));

// MongoDB connection using environment variable or local fallback
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/hackSIST-content';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a Mongoose schema
const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  phoneNumber: String,
  yearOfStudy: String,
  department: String,
  previousExperience: String,
  writingSamples: String,
  whyContentLead: String,
  newIdeas: String,
});

// Define a Mongoose model
const User = mongoose.model('User', userSchema);

// Endpoint to handle registrations with limit of 20 registrations
app.post('/api/register', async (req, res) => {
  try {
    // Check the number of current registrations
    const userCount = await User.countDocuments();
    if (userCount >= 20) {
      return res.status(400).send('Registration limit reached. No more registrations allowed.');
    }

    const { email } = req.body;
    // Check if the user is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send('Email already registered.');
    }

    // Register the new user
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Start the server on the specified port or default to port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
