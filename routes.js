// Import the express module
const express = require('express');
const fs = require('fs');// Require the File System module
const router = express.Router(); // Create  express routers

/////////////////////////////SECTION SANDRA VERA [LOGIN PAGE, DASHBOARD PAGE AND VIEW STUDIOS PAGE]///////////////////////////////////////////////

// Import local module
const { displayFilePath, readJsonFile } = require('./json-management.js');

// Set the file name
const STUDIOS_DATA_FILENAME = './json/studios.json';
const USERS_DATA_FILENAME = './json/users.json';

//////////////////////////////////////////////////////////////////////////////


// Import the path module
const path = require('path');

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

router.get('/dashboard', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'pages/dashboard.html'));
});

router.get('/view-studios', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'pages/view-studios.html'));
});

//////////////////////////////////////////////////////////////////////////////

// Login page connect with users.json for validate Email and display information owner in view-studios.html

router.get('/users', async (req, res) => {
    let existingData = await readJsonFile(USERS_DATA_FILENAME);
    res.json(existingData);
});

////////////////////////////////////////////////////////////////////////////
// Dashboard page connect with studios.json for get information about studios 

router.get('/studios', async (req, res) => {
    let existingData = await readJsonFile(STUDIOS_DATA_FILENAME);
    res.json(existingData);
});

////////////////////////////////////////////////////////////////////////////
// View-Studios page connect with studios.json for delete information about studios

router.delete('/delete-studio/:id', async (req, res) => {
    let existingData = await readJsonFile(STUDIOS_DATA_FILENAME);
    let found = existingData.find(function (item) {
        return item.idStudio === parseInt(req.params.id);
    });
    if (found) {
        let targetStudio = existingData.indexOf(found);

        existingData.splice(targetStudio, 1);
        // convert JSON object to a string
        const dataRegis = JSON.stringify(existingData);

        // write registration in registrations.json
        fs.writeFileSync(STUDIOS_DATA_FILENAME, dataRegis);

        res.sendStatus(204);
    } else {
        res.sendStatus(500);
    }
});













///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//--------------------------------------------------------------------------







////////////////////////////SECTION ERICK MULIA [SIGNUP PAGE AND PROFILE PAGE]/////////////////////////////////////////////////////////////////////
// Sign-up route
router.post('/signup', (req, res) => {
    const { name, phoneNumber, email, role } = req.body;
    let users = JSON.parse(fs.readFileSync('json/users.json', 'utf-8'));

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).send('User with this email already exists.');
    }

    const newUser = { name, phoneNumber, email, role };
    users.push(newUser);
    fs.writeFileSync('json/users.json', JSON.stringify(users, null, 2));

    res.status(201).send('User created successfully!');
});

// Profile update route
router.post('/profile/update', (req, res) => {
    const { email, name, phoneNumber } = req.body;
    let users = JSON.parse(fs.readFileSync('json/users.json', 'utf-8'));

    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex === -1) {
        return res.status(404).send('User not found.');
    }

    users[userIndex] = { ...users[userIndex], name, phoneNumber };
    fs.writeFileSync('json/users.json', JSON.stringify(users, null, 2));

    res.status(200).send('Profile updated successfully!');
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//--------------------------------------------------------------------------





////////////////////////////SECTION ALI KHUDHAIR [ADD STUDIO PAGE AND UPDATE STUDIO PAGE ]/////////////////////////////////////////////////////////







///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// Error handling route
router.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'pages/error.html'));
});

module.exports = router;