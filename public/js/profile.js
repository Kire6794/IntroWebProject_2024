document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profile-form');
    const loggedInUser = CheckLoggedUser(); // Use session management functions

    // Hide "Add Studio" and "Update Studio" buttons for renters
    if (loggedInUser && loggedInUser.role === "renter") {
        const addStudio = document.getElementById('addStudio');
        const updateStudio = document.getElementById('updateStudio');

        if (addStudio) addStudio.style.display = 'none';
        if (updateStudio) updateStudio.style.display = 'none';
    }

    // Load users from JSON file if not already loaded
    if (!localStorage.getItem('users')) {
        fetch('../json/users.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('users', JSON.stringify(data));
                updateProfileUI(loggedInUser);
            });
    } else {
        updateProfileUI(loggedInUser);
    }

    function updateProfileUI(loggedInUser) {
        if (loggedInUser) {
            document.getElementById('current-name').innerText = loggedInUser.name;
            document.getElementById('current-phone').innerText = loggedInUser.phoneNumber;
            document.getElementById('current-email').innerText = loggedInUser.email;

            document.getElementById('profile-name').value = loggedInUser.name;
            document.getElementById('profile-phone').value = loggedInUser.phoneNumber;
            document.getElementById('profile-email').value = loggedInUser.email;

            document.getElementById('username').innerText = loggedInUser.name;
        }
    }

    // Event listener for form submission
    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const data = {
            email: document.getElementById('profile-email').value,
            name: document.getElementById('profile-name').value,
            phoneNumber: document.getElementById('profile-phone').value,
        };

        fetch('/profile/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        .then(response => response.text())
        .then(message => alert(message))
        .catch(error => console.error('Error:', error));
    });

    // Event listener for logout button
    document.getElementById('logout').addEventListener('click', function() {
        DeleteSession();
        alert('Logged out successfully!');
        window.location.href = '../index.html';
    });
});
