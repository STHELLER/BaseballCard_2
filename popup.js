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
