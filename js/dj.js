document.addEventListener('DOMContentLoaded', function() {
    const requestsList = document.getElementById('requestsList');
    const noRequests = document.getElementById('noRequests');
    const loadingElement = document.querySelector('.loading');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    let currentFilter = 'all';
    
    // Check if db is available
    if (typeof window.db === 'undefined') {
      console.error('Firestore db is not defined. Check firebase-config.js');
      loadingElement.textContent = 'Error: Database connection failed';
      return;
    }
    
    // Real-time listener for song requests
    function loadSongRequests() {
      loadingElement.classList.remove('hidden');
      
      window.db.collection('songRequests')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          loadingElement.classList.add('hidden');
          
          if (snapshot.empty) {
            requestsList.innerHTML = '';
            noRequests.classList.remove('hidden');
            return;
          }
          
          noRequests.classList.add('hidden');
          requestsList.innerHTML = '';
          
          snapshot.forEach((doc) => {
            const request = doc.data();
            const id = doc.id;
            
            // Skip if not matching current filter
            if (currentFilter !== 'all' && request.status !== currentFilter) {
              return;
            }
            
            const tr = document.createElement('tr');
            tr.className = `status-${request.status}`;
            
            // Format timestamp
            const timestamp = request.timestamp ? request.timestamp.toDate() : new Date();
            const timeFormatted = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            tr.innerHTML = `
              <td>${timeFormatted}</td>
              <td>${request.guestName}</td>
              <td>${request.songTitle}</td>
              <td>${request.artist}</td>
              <td class="status">${request.status}</td>
              <td class="actions">
                ${getActionButtons(id, request.status)}
              </td>
            `;
            
            requestsList.appendChild(tr);
          });
          
          // Add event listeners to all buttons
          addButtonEventListeners();
        }, (error) => {
          console.error("Error getting song requests: ", error);
          loadingElement.classList.add('hidden');
          loadingElement.textContent = `Error: ${error.message}`;
        });
    }
    
    // Generate action buttons based on status
    function getActionButtons(id, status) {
      if (status === 'pending') {
        return `
          <button class="btn approve" data-id="${id}">Approve</button>
          <button class="btn reject" data-id="${id}">Reject</button>
        `;
      } else if (status === 'approved') {
        return `
          <button class="btn played" data-id="${id}">Mark Played</button>
          <button class="btn reject" data-id="${id}">Reject</button>
        `;
      } else {
        return `
          <button class="btn delete" data-id="${id}">Delete</button>
        `;
      }
    }
    
    // Add event listeners to action buttons
    function addButtonEventListeners() {
      // Approve buttons
      document.querySelectorAll('.btn.approve').forEach(button => {
        button.addEventListener('click', function() {
          const id = this.getAttribute('data-id');
          updateRequestStatus(id, 'approved');
        });
      });
      
      // Reject buttons
      document.querySelectorAll('.btn.reject').forEach(button => {
        button.addEventListener('click', function() {
          const id = this.getAttribute('data-id');
          updateRequestStatus(id, 'rejected');
        });
      });
      
      // Played buttons
      document.querySelectorAll('.btn.played').forEach(button => {
        button.addEventListener('click', function() {
          const id = this.getAttribute('data-id');
          updateRequestStatus(id, 'played');
        });
      });
      
      // Delete buttons
      document.querySelectorAll('.btn.delete').forEach(button => {
        button.addEventListener('click', function() {
          const id = this.getAttribute('data-id');
          deleteRequest(id);
        });
      });
    }
    
    // Update song request status
    function updateRequestStatus(id, status) {
      window.db.collection('songRequests').doc(id).update({
        status: status
      })
      .catch((error) => {
        console.error("Error updating song request: ", error);
      });
    }
    
    // Delete song request
    function deleteRequest(id) {
      window.db.collection('songRequests').doc(id).delete()
      .catch((error) => {
        console.error("Error deleting song request: ", error);
      });
    }
    
    // Filter buttons event listeners
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        currentFilter = filter;
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Reload requests with new filter
        loadSongRequests();
      });
    });
    
    // Initial load
    loadSongRequests();
  });