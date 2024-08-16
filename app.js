const express = require('express');
const routes = require('./routes.js');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(cors()); // Enable CORS

// Serve static files
app.use(express.static('public'));

// Use routes from routes.js
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is running and app is listening on port " + PORT);
    } else {
        console.log("ERROR: Server cannot start.", error);
    }
});
