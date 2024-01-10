// Import the createSlice function from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the auth slice
const initialState = {
    mode: "light",    // Current display mode (light or dark)
    user: null,       // Currently logged-in user information
    token: null,      // User authentication token
    posts: [],        // List of posts
}

// Create an authSlice using createSlice
export const authSlice = createSlice({
    name: "auth",  // Name of the slice
    initialState,  // Initial state defined above
    reducers: {
        // Reducer to toggle between light and dark mode
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        // Reducer to set user login information
        setLogin: (state, action) => {
            state.user = action.payload.user;   // Set the user object
            state.token = action.payload.token; // Set the authentication token
        },
        // Reducer to clear user information on logout
        setLogout: (state) => {
            state.user = null;   // Clear user object
            state.token = null;  // Clear authentication token
        },
        // Reducer to set user's friends
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends; // Set user's friends
            } else {
                console.error("user friends non-existent :("); // Log an error if user is not defined
            }
        },
        // Reducer to set the list of posts
        setPosts: (state, action) => {
            state.posts = action.payload.posts; // Set the list of posts
        },
        // Reducer to update a specific post
        setPost: (state, action) => {
            // Map through the posts and update the one with the matching ID
            const updatedPosts = state.posts.map((post) => {
                if (post.id === action.payload.post.id) {
                    return action.payload.post; // Update the matching post
                } else {
                    return post; // Keep other posts unchanged
                }
            });
            state.posts = updatedPosts; // Set the updated list of posts
        }
    }
})

// Export individual action creators for the reducers
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;

// Export the reducer function for the auth slice
export default authSlice.reducer;
