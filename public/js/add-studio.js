document.addEventListener('DOMContentLoaded', () => {
    const addStudioForm = document.getElementById('add-studio-form');
    const studioList = document.getElementById('studio-list');

    const saveStudios = (studios) => {
        localStorage.setItem('studios', JSON.stringify(studios));
    };

    const loadStudios = () => {
        const studios = JSON.parse(localStorage.getItem('studios')) || [];
        studios.forEach(studio => {
            addStudioToDOM(studio);
        });
    };

    const addStudioToDOM = (studio) => {
        const studioItem = document.createElement('div');
        studioItem.className = 'studio-item';
        studioItem.innerHTML = `
            <strong>Name:</strong> ${studio.Name} <br>
            <strong>Location:</strong> ${studio.Address} <br>
            <strong>Description:</strong> ${studio.Description} <br>
            <strong>Area:</strong> ${studio.Area} sq meters <br>
            <strong>Type:</strong> ${studio.Type} <br>
            <strong>Capacity:</strong> ${studio.Capacity} people <br>
            <strong>Parking:</strong> ${studio.Parking ? 'Yes' : 'No'} <br>
            <strong>Public Transport:</strong> ${studio.PublicTransport ? 'Yes' : 'No'} <br>
            <strong>Availability:</strong> ${studio.Available ? 'Yes' : 'No'} <br>
            <strong>Rental Term:</strong> ${studio.RentalTerm} <br>
            <strong>Price:</strong> $${studio.PricePerTerm}
        `;
        studioList.appendChild(studioItem);
    };

    addStudioForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const studio = {
            Name: document.getElementById('studioName').value,
            Address: document.getElementById('location').value,
            Description: document.getElementById('description').value,
            Area: document.getElementById('area').value,
            Type: document.getElementById('type').value,
            Capacity: document.getElementById('capacity').value,
            Parking: document.getElementById('parking').checked,
            PublicTransport: document.getElementById('publicTransport').checked,
            Available: document.getElementById('availability').checked,
            RentalTerm: document.getElementById('rentalTerm').value,
            PricePerTerm: document.getElementById('price').value
        };

        addStudioToDOM(studio);

        const studios = JSON.parse(localStorage.getItem('studios')) || [];
        studios.push(studio);
        saveStudios(studios);

        addStudioForm.reset();
    });

    loadStudios();
});
