const express = require('express');
const cors = require('cors');
const http = require('http');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 5001;  // Define the PORT variable here

// Use CORS middleware for Express
app.use(cors({
    origin: "http://localhost:3000", // Allow only localhost:3000
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));

const uri = "mongodb+srv://martinerik99:ug5uzVjD3UjYJ3VW@dat640.ehx2a.mongodb.net/?retryWrites=true&w=majority&appName=DAT640";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB and start the server only after connection is successful
client.connect()
    .then(() => {
        console.log("Connected to MongoDB");

        const db = client.db("musicDB");
        const usersCollection = db.collection("users");

        // Route to get playlists for a specific user
        app.get('/playlists/:username', async (req, res) => {
            const username = req.params.username;
            try {
                const user = await usersCollection.findOne({ username: username });
                if (user && user.playlists) {
                    res.status(200).json(user.playlists);
                } else {
                    res.status(404).json({ error: "User not found or no playlists" });
                }
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: "Failed to fetch playlists" });
            }
        });

        // Route to delete a specific playlist for a specific user
        app.delete('/playlists/:username/:playlistName', async (req, res) => {
            const username = req.params.username;
            const playlistName = req.params.playlistName;
            
            try {
                const user = await usersCollection.findOne({ username: username });
                if (user && user.playlists) {
                    const updatedPlaylists = user.playlists.filter(playlist => playlist.name !== playlistName);

                    // Update the user document with the filtered playlists
                    await usersCollection.updateOne(
                        { username: username },
                        { $set: { playlists: updatedPlaylists } }
                    );

                    res.status(200).json({ message: "Playlist deleted successfully" });
                } else {
                    res.status(404).json({ error: "User not found or no playlists" });
                }
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: "Failed to delete playlist" });
            }
        });

        app.delete('/playlists/:username/:playlistName/songs/:songTitle', async (req, res) => {
            const { username, playlistName, songTitle } = req.params;
            
            try {
                const user = await usersCollection.findOne({ username: username });
                
                if (user && user.playlists) {
                    const playlist = user.playlists.find(p => p.name === playlistName);
                    if (playlist) {
                        // Remove the song from the playlist
                        playlist.songs = playlist.songs.filter(song => song.title !== songTitle);
        
                        // Update MongoDB with the removed song
                        await usersCollection.updateOne(
                            { username: username, "playlists.name": playlistName },
                            { $set: { "playlists.$.songs": playlist.songs } }
                        );
        
                        res.status(200).json({ message: "Song deleted successfully" });
                    } else {
                        res.status(404).json({ error: "Playlist not found" });
                    }
                } else {
                    res.status(404).json({ error: "User not found" });
                }
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: "Failed to delete song" });
            }
        });        

        // Create and start the HTTP server
        const server = http.createServer(app);
        server.listen(PORT, () => {
            console.log(`Server running on http://127.0.0.1:${PORT}`);
        });
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB", err);
    });