// Change text color
const backgroundElement = document.querySelector('.main');

const observer = new MutationObserver(() => {
  updateTextColor();
});

// Observe changes to attributes, style, and childList
observer.observe(backgroundElement, { attributes: true, childList: true, subtree: true });

// Use 'load' event to ensure the '.main' element is present
window.addEventListener('load', () => {
  updateTextColor(); // Initial update on page load
});

function calculateContrastingColor(backgroundColor) {
  const rgbValues = backgroundColor.match(/\d+/g).map(Number);
  const brightness = (rgbValues[0] * 299 + rgbValues[1] * 587 + rgbValues[2] * 114) / 1000;

  return brightness > 128 ? '#000' : '#fff';
}

function updateTextColor() {
  const backgroundColor = window.getComputedStyle(backgroundElement).backgroundColor;
  const newTextColor = calculateContrastingColor(backgroundColor);

  document.documentElement.style.setProperty('--text-color', newTextColor);
}



// Function to display search results
function displaySearchResults(searchResults) {
    let searchResultsContainer = document.getElementById('searchResults');
    // Clear previous results
    searchResultsContainer.innerHTML = '';

    // Display new results
    searchResults.forEach(result => {
        let resultItem = document.createElement('div');
        resultItem.textContent = result;
        searchResultsContainer.create_appendChild(resultItem);
    });
}

// Function to send search query to the backend and display results
function searchSongs() {
    let query = document.getElementById('searchInput').value;

    // Send the query to the backend using AJAX/fetch
    fetch(`/api/search?query=${query}`)
        .then(response => response.json())
        .then(data => {
            // Display search results on the frontend
            displaySearchResults(data.results);
        })
        .catch(error => console.error('Error:', error));
}

// Function to display song details
function displaySongInfo(songDetails) {
    let songInfoContainer = document.getElementById('songInfo');
    // Clear previous details
    songInfoContainer.innerHTML = '';

    // Display new details
    let titleElement = document.createElement('h3');
    titleElement.textContent = songDetails.title;

    let artistElement = document.createElement('p');
    artistElement.textContent = `Artist: ${songDetails.artist}`;

    let albumElement = document.createElement('p');
    albumElement.textContent = `Album: ${songDetails.album}`;

    songInfoContainer.create_appendChild(titleElement);
    songInfoContainer.create_appendChild(artistElement);
    songInfoContainer.create_appendChild(albumElement);
}

// Function to set the song URL for playback
function setPlaybackOptions(songUrl) {
    let audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = songUrl;
}

// Function to collect user feedback
function collectUserFeedback(response) {
    let userFeedback = {
        response: response,
        likedSongs: document.getElementById('likedSongs').value.split(',')
    };

    // Send the feedback to the backend using AJAX/fetch
    fetch('/api/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'create_application/json',
        },
        body: JSON.stringify(userFeedback),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the backend if needed
    })
    .catch(error => console.error('Error:', error));
}

// Function to update the user-song matrix
function updateUserSongMatrix(userFeedback) {
    // Send the feedback to the backend using AJAX/fetch
    // This function can be implemented based on your backend requirements
}

// Function to create a playlist
function createPlaylist() {
    let playlistName = document.getElementById('playlistName').value;

    // Send the playlist name to the backend using AJAX/fetch
    fetch('/api/playlists', {
        method: 'POST',
        headers: {
            'Content-Type': 'create_application/json',
        },
        body: JSON.stringify({ name: playlistName }),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the backend if needed
        console.log('Playlist created:', data);
    })
    .catch(error => console.error('Error:', error));
}

// Function to add a song to a playlist
function addToPlaylist(songId) {
    let playlistName = document.getElementById('playlistName').value;

    // Send the song ID and playlist name to the backend using AJAX/fetch
    fetch(`/api/playlists/${playlistName}/add-song/${songId}`, {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the backend if needed
        console.log('Song added to playlist:', data);
    })
    .catch(error => console.error('Error:', error));
}

