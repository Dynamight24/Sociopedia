// Import necessary modules and controllers
import express from "express"
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/user.js"

import { verifyToken } from "../middleware/auth.js"

// Create an Express Router
const router = express.Router();

// Routes for reading user data and friends

// Route to get a user's information by their ID.
// Requires authentication (verifyToken middleware).
router.get("/:id", verifyToken, getUser);

// Route to get a user's friends list.
// Requires authentication (verifyToken middleware).
router.get("/:id/friends", verifyToken, getUserFriends);

// Route to add or remove a friend for a user.
// It takes both the user's ID and the friend's ID as parameters.
// Requires authentication (verifyToken middleware).
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

// Export the router to be used in other parts of the application
export default router;
