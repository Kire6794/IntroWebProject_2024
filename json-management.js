/*
Group member’s name:
Sandra Vera Gomez
Erick Mulia Goycoolea
Ali Khudhair
Contribution in this file by Sandra Vera Gomez
*/




// Require the File System module and Path
const fs = require('fs');
const path = require('path');


//Search File Location
function searchDirectory(directory, filename) {

    const files = fs.readdirSync(directory);

    for (const file of files) {
        const filePath = path.join(directory, file);
        const fileStats = fs.statSync(filePath);

        if (fileStats.isDirectory()) {
            const location = searchDirectory(filePath);
            if (location) {
                return location;
            }
        } else if (file === filename) {
            return filePath;
        }
    }

    return null;
}

// Display the location of the given filename
function displayFilePath(filename) {


    const currentDirectory = process.cwd();

    const filePath = searchDirectory(currentDirectory, filename);

    if (filePath) {
        console.log(`${filename} file stored at: ${filePath}`);
    } else {
        console.log(`ERROR: ${filename} file not found.`);
    }
}

//Read information from JSON file
function readJsonFile(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {

            if (err) {
                reject(err);
                return;
            }

            try {
                const RegistrationData = data == "" ? [] : JSON.parse(data);
                resolve(RegistrationData);
            } catch (error) {
                reject(error);
            }

        });
    });
}


module.exports = { displayFilePath, readJsonFile };