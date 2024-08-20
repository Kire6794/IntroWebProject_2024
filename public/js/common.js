const sessionUser = "sessionUser";
const sessionStudios = "studios";
const sessionUsers = "users";

const ownerRole = "studio-owner";
const renterRole = "renter";

function SetSession(person) {
    localStorage.setItem(sessionUser, JSON.stringify(person));
    getStudios();
    getUsers();
}

function GetSession() {
    let user = localStorage.getItem(sessionUser);
    if (typeof user !== 'undefined' && user !== null) {
        return JSON.parse(user);
    } else {
        return null;
    }
}

function DeleteSession() {
    localStorage.removeItem(sessionUser);
    localStorage.removeItem(sessionStudios);
    localStorage.removeItem(sessionUsers);
    CheckLoggedUser();
}

function CheckLoggedUser() {
    let user = GetSession();
    if (user === null) {
        window.location.href = "../index.html";
    } else {
        return user;
    }
}

function getStudios(fnSuccess) {
    // Load studios from JSON file if not already loaded
    if (!localStorage.getItem(sessionStudios)) {
        fetch('/studios')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem(sessionStudios, JSON.stringify(data));
                if (typeof fnSuccess !== 'undefined') {
                    fnSuccess();
                }
            });
    }
}
function getUsers() {
    // Load users from JSON file if not already loaded
    if (!localStorage.getItem(sessionUsers)) {
        fetch('/users')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem(sessionUsers, JSON.stringify(data));
            });
    }
}

$(document).ready(function () {
    $("#logout").click(function () {
        DeleteSession();
    });

    if (typeof user !== 'undefined' && user !== null) {
        $("#username").html(user.name);
    }
});