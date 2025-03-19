document.addEventListener('DOMContentLoaded', function() {
    const requestForm = document.getElementById('requestForm');
    const statusDiv = document.getElementById('status');
  
    requestForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const guestName = document.getElementById('guestName').value;
      const songTitle = document.getElementById('songTitle').value;
      const artist = document.getElementById('artist').value;
      
      // Create timestamp
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      
      // Add request to Firestore
      db.collection('songRequests').add({
        guestName: guestName,
        songTitle: songTitle,
        artist: artist,
        timestamp: timestamp,
        status: 'pending' // pending, approved, played, rejected
      })
      .then(() => {
        // Show success message
        statusDiv.textContent = 'Song request submitted successfully!';
        statusDiv.className = 'status success';
        
        // Reset form
        requestForm.reset();
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          statusDiv.textContent = '';
          statusDiv.className = 'status';
        }, 3000);
      })
      .catch((error) => {
        // Show error message
        statusDiv.textContent = `Error: ${error.message}`;
        statusDiv.className = 'status error';
      });
    });
  });