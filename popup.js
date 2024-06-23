document.addEventListener('DOMContentLoaded', function() {
    const createCardButton = document.getElementById('createCardButton');
    const cardContainer = document.getElementById('cardContainer');

    createCardButton.addEventListener('click', function() {
        const name = document.getElementById('name').text;
        const photo = document.getElementById('photo').file[0];
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

            // Create text element
            const text = document.createElement('div');
            text.className = 'card-text';
            text.textContent = name;

            // Append elements to card
            card.appendChild(img);
            card.appendChild(text);

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


