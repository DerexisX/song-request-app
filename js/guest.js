document.addEventListener('DOMContentLoaded', function() {
    const requestForm = document.getElementById('requestForm');
    const statusDiv = document.getElementById('status');
  
    // Make sure Firebase is properly initialized before using it
    if (typeof firebase === 'undefined') {
      console.error('Firebase is not defined. Make sure firebase scripts are loaded properly.');
      statusDiv.textContent = 'Error: Firebase SDK not loaded';
      statusDiv.className = 'status error';
      return;
    }
  
    // Check if db is available
    if (typeof window.db === 'undefined') {
      console.error('Firestore db is not defined. Check firebase-config.js');
      statusDiv.textContent = 'Error: Database connection failed';
      statusDiv.className = 'status error';
      return;
    }
  
    requestForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const guestName = document.getElementById('guestName').value;
      const songTitle = document.getElementById('songTitle').value;
      const artist = document.getElementById('artist').value;
      
      // Add logging to debug
      console.log('Form submitted:', { guestName, songTitle, artist });
      
      try {
        // Create timestamp
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        
        // Add request to Firestore - use window.db instead of db
        window.db.collection('songRequests').add({
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
          console.log('Request added to Firestore');
          
          // Reset form
          requestForm.reset();
          
          // Clear success message after 3 seconds
          setTimeout(() => {
            statusDiv.textContent = '';
            statusDiv.className = 'status';
          }, 3000);
        })
        .catch((error) => {
          console.error('Error adding request:', error);
          // Show error message
          statusDiv.textContent = `Error: ${error.message}`;
          statusDiv.className = 'status error';
        });
      } catch (error) {
        console.error('Exception occurred:', error);
        statusDiv.textContent = `Error: ${error.message}`;
        statusDiv.className = 'status error';
      }
    });
  });