document.addEventListener('DOMContentLoaded', function() {
    const createCardButton = document.getElementById('createCardButton');
    const downloadButton = document.getElementById('downloadButton');
    const cardContainer = document.getElementById('cardContainer');

    createCardButton.addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const time = document.getElementById('time').value;
        const location = document.getElementById('location').value;
        const bio = document.getElementById('bio').value.replace(/\n/g, '<br>');
        const team = document.getElementById('team').value;
        const notes = document.getElementById('notes').value.replace(/\n/g, '<br>');
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
                { class: 'team', text: team },
                { class: 'notes', text: notes }
            ];

            fields.forEach(field => {
                const textElement = document.createElement('div');
                textElement.className = `card-field ${field.class}`;
                textElement.innerHTML = field.text; // Use innerHTML to handle line breaks
                card.appendChild(textElement);
            });

            // Append elements to card
            card.appendChild(img);

            // Append card to container
            cardContainer.appendChild(card);

            // Show download button
            downloadButton.style.display = 'inline-block';
        };

        if (photo) {
            reader.readAsDataURL(photo);
        } else {
            alert('Please select a photo');
        }
    });

    downloadButton.addEventListener('click', function() {
        html2canvas(document.querySelector('.baseball-card')).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'baseball_card.png';

            // Create a blob and use FileReader to convert it to a DataURL
            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);

                // iOS Safari workaround
                if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                    const reader = new FileReader();
                    reader.onloadend = function() {
                        const image = new Image();
                        image.src = reader.result;
                        const w = window.open("");
                        w.document.write(image.outerHTML);
                    };
                    reader.readAsDataURL(blob);
                } else {
                    link.href = url;
                    link.download = 'baseball_card.png';
                    link.click();
                    URL.revokeObjectURL(url); // Clean up
                }
            });
        });
    });
});
