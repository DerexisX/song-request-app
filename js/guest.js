document.addEventListener('DOMContentLoaded', function() {
  const requestForm = document.getElementById('requestForm');
  const statusDiv = document.getElementById('status');
  
  console.log('Guest JS loaded');
  
  // Check if Firebase is properly initialized
  if (typeof firebase === 'undefined') {
      console.error('Firebase is not defined');
      statusDiv.textContent = 'Error: Firebase SDK not loaded';
      statusDiv.className = 'status error';
      return;
  }
  
  console.log('Firebase detected');
  
  // Check if db is available
  if (typeof window.db === 'undefined') {
      console.error('Firestore db is not defined');
      statusDiv.textContent = 'Error: Database connection failed';
      statusDiv.className = 'status error';
      return;
  }
  
  console.log('Firestore db detected');
  
  // Add form submission event listener
  requestForm.addEventListener('submit', function(e) {
      e.preventDefault(); // This prevents the page from refreshing
      console.log('Form submitted');
      
      // Get form values
      const guestName = document.getElementById('guestName').value;
      const songTitle = document.getElementById('songTitle').value;
      const artist = document.getElementById('artist').value;
      
      console.log('Form data:', { guestName, songTitle, artist });
      
      // Disable form while submitting
      const submitButton = requestForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';
      
      // Create request object
      const songRequest = {
          guestName: guestName,
          songTitle: songTitle,
          artist: artist,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          status: 'pending'
      };
      
      console.log('Sending to Firestore:', songRequest);
      
      // Add to Firestore
      window.db.collection('songRequests').add(songRequest)
      .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id);
          statusDiv.textContent = 'Song request submitted successfully!';
          statusDiv.className = 'status success';
          requestForm.reset();
          
          // Re-enable form
          submitButton.disabled = false;
          submitButton.textContent = 'Submit Request';
          
          // Clear success message after 3 seconds
          setTimeout(function() {
              statusDiv.textContent = '';
              statusDiv.className = 'status';
          }, 3000);
      })
      .catch(function(error) {
          console.error('Error adding document: ', error);
          statusDiv.textContent = 'Error: ' + error.message;
          statusDiv.className = 'status error';
          
          // Re-enable form
          submitButton.disabled = false;
          submitButton.textContent = 'Submit Request';
      });
  });
});