// Import required modules and libraries
import express from "express"                // Import Express.js framework
import bodyParser from "body-parser"        // Middleware for parsing request bodies
import mongoose from "mongoose"              // MongoDB ODM (Object-Document Mapper)
import cors from "cors"                      // Middleware for handling Cross-Origin Resource Sharing
import dotenv from "dotenv"                  // Load environment variables from a .env file
import multer from "multer"                  // Middleware for handling file uploads
import helmet from "helmet"                  // Middleware for adding security headers to HTTP responses
import morgan from "morgan"                  // Middleware for HTTP request logging
import path from "path"                      // Node.js path utility
import { fileURLToPath } from "url"          // Utility for working with file URLs

// Import routes, controllers, and models
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import { register } from "./controllers/auth.js"
import { createPost } from "./controllers/posts.js"
import { verifyToken } from "./middleware/auth.js"
import User from "./models/User.js"
import Post from "./models/Post.js"
import { users, posts } from "./data/index.js";



// Configurations

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()  // Load environment variables from .env file
const _dirname = path.resolve();
const app = express()                          // Create an instance of the Express application

// Middleware setup
app.use(express())                            // Initialize Express
app.use(express.json())                       // Parse JSON request bodies
app.use(helmet())                             // Add security headers to HTTP responses
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })) // Set CORS policy
app.use(morgan("common"))                     // Log HTTP requests
app.use(bodyParser.json({ limit: "30mb", extended: true }))   // Parse JSON with size and extended options
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })) // Parse URL-encoded request bodies
app.use(cors())                               // Enable Cross-Origin Resource Sharing
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))) // Serve static files from 'public/assets' directory

// File Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets')                 // Define the destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)               // Define the filename for uploaded files
  }
})

const upload = multer({ storage })            // Initialize multer for file upload

// Routes with File Uploads
app.post("/auth/register", upload.single("picture"), register) // Route for user registration with a profile picture
app.post("/post", verifyToken, upload.single("picture"), createPost) // Route for creating posts with a picture

// Define API Routes
app.use("/auth", authRoutes)                  // Mount routes related to authentication under '/auth'
app.use("/users", userRoutes)                // Mount routes related to user management under '/users'
app.use("/posts", postRoutes)                // Mount routes related to posts under '/posts'

// Mongoose Database Setup
const PORT = process.env.PORT       // Define the server port
mongoose.connect(process.env.MONGO_URL, {     // Connect to MongoDB using the provided URL
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`)) // Start the server and log the port
  // User.insertMany(users);                 // Optional: Insert initial user data into the database
  // Post.insertMany(posts);             // Optional: Insert initial post data into the database
}).catch((error) => console.log(`${error} did not connect`)) // Handle connection errors

app.use(express.static(path.join(_dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "client", "dist", "index.html"))
})



