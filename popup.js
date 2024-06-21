document.addEventListener('DOMContentLoaded', function() {
    const createCardButton = document.getElementById('createCardButton');
    const cardContainer = document.getElementById('cardContainer');

    createCardButton.addEventListener('click', function() {
        const name = document.getElementById('name').value;
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


// Define a variable to store the deferred prompt event
let deferredPrompt;

// Event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;
  // Show the install button or trigger the installation prompt
  showInstallPrompt();
});

// Function to show the install button and handle user interaction
function showInstallPrompt() {
  const installButton = document.getElementById('installButton');
  installButton.style.display = 'block'; // Display the install button
  installButton.addEventListener('click', () => {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });
}
