// Import the express module
const express = require('express');
const fs = require('fs');
const router = express.Router();

/////////////////////////////SECTION SANDRA VERA [LOGIN PAGE, DASHBOARD PAGE AND VIEW STUDIOS PAGE]///////////////////////////////////////////////





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

module.exports = router;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//--------------------------------------------------------------------------





////////////////////////////SECTION ALI KHUDHAIR [ADD STUDIO PAGE AND UPDATE STUDIO PAGE ]/////////////////////////////////////////////////////////







///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////