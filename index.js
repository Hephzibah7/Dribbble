import express from "express"
import mongoose from "mongoose";
import cors from "cors";
// import Profile from "./profile.js";
import multer from "multer";
import path from "path";
import axios from "axios";
import { Resend } from 'resend';

const app = express();
app.use(express.json())
app.use(express.urlencoded())
const router = express.Router();

const PORT = process.env.PORT || 9002;
const resend = new Resend('re_Kngi1nw9_79p6G8hx6RCbfxsJ5aaQsZUS');

app.use(cors({
    origin:["http://localhost:3000","http://localhost:9002"],
    methods:"GET,POST,PUT,DELETE",
    credentials:true
  }))
// Connect to MongoDB

mongoose.connect('mongodb://127.0.0.1:27017/Dribbble', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });




// Define a user schema
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model('users', userSchema);

app.use(express.json()); // Middleware to parse JSON bodies


// Handle POST request to /signup endpoint
app.post('/signup', async (req, res) => {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists.' });
    }
    const newUser = new User({ name, username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.', user:newUser});
    const val=newUser.email;
    //email
    try {
      const response = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [val],
        subject: 'Email Verification',
        text: 'Thank You for Signing Up! We welcome you to Dribbble',
        headers: {
          'X-Entity-Ref-ID': '123456789',
        },
      });
    
      console.log('Email sent successfully:', response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
    
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});












const profileSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  // You can add more fields to the schema as needed
});

const Profile = mongoose.model('profiles', profileSchema);



// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename files with a unique timestamp
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// POST endpoint to handle profile data
app.post('/profile', upload.single('image'), async (req, res) => {
  console.log('Received POST request to /profile');
  console.log('Request Body:', req.body); // Log the request body
  const location = req.body.location;
  const imagePath = req.body.image;

  try {
    // Create a new profile document using the Profile schema
    const newProfile = new Profile({ location, imagePath });

    // Save the new profile document to the database
    await newProfile.save();

    // Respond with a success message and the profile data
    res.status(200).json({ message: 'Profile data saved successfully', imagePath, location });
  } catch (error) {
    console.error('Error saving profile data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


























