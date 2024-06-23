document.addEventListener('DOMContentLoaded', function() {
    const createCardButton = document.getElementById('createCardButton');
    const cardContainer = document.getElementById('cardContainer');

    createCardButton.addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const time = document.getElementById('time').value;
        const location = document.getElementById('location').value;
        const bio = document.getElementById('bio').value;
        const team = document.getElementById('team').value;
        const photo = document.getElementById('photo').files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const imageDataUrl = event.target.result;

            // Clear previous card if exists
            cardContainer.innerHTML = '';

            // Create card element
            const card = document.createElement('div');
            card.className = 'baseball-card';

            // Create image element
            const img = document.createElement('img');
            img.src = imageDataUrl;
            img.className = 'card-image';

            // Create and append text elements
            const fields = [
                { class: 'name', text: name },
                { class: 'time', text: time },
                { class: 'location', text: location },
                { class: 'bio', text: bio },
                { class: 'team', text: team }
            ];

            fields.forEach(field => {
                const textElement = document.createElement('div');
                textElement.className = `card-field ${field.class}`;
                textElement.textContent = field.text;
                card.appendChild(textElement);
            });

            // Append elements to card
            card.appendChild(img);

            // Append card to container
            cardContainer.appendChild(card);
        };

        if (photo) {
            reader.readAsDataURL(photo);
        } else {
            alert('Please select a photo');
        }
    });
});
