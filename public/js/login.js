function ValidateEmail() {
    fetch('../json/users.json')
        .then(response => response.json())
        .then(users => {
            let person = users.find((person) => person.email == $("#login").val()); //find array https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
            if (typeof person !== 'undefined') {
                SetSession(person);
                GotoDashboard();
            } else {
                alert("Email address is not exist, please try again.");
            }
        });
}

function GotoDashboard() {
    window.location.href = "../pages/dashboard.html";
}


let user = GetSession();

$(document).ready(function () {
    if (user !== null) {
        GotoDashboard();
    }
});