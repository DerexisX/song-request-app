# Song Request App

A simple web application that allows guests to submit song requests that DJs can manage through a separate interface.

## Features

- **Guest Interface**: Simple form to submit song requests with name, song title, and artist
- **DJ Interface**: Real-time dashboard to view, approve, reject, and manage song requests
- **Status Tracking**: Track requests through their lifecycle (pending → approved → played)
- **Filtering**: Filter requests by status

## Technologies Used

- HTML, CSS, JavaScript
- Firebase Firestore for real-time database

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/song-request-app.git
   cd song-request-app
   ```

2. Create a Firebase project at [firebase.google.com](https://firebase.google.com/)

3. Enable Firestore Database in your Firebase project

4. Update the Firebase configuration in `js/firebase-config.js` with your own Firebase project credentials

5. Deploy or run locally:
   - For local testing, use a local development server:
     ```
     # Using Python
     python -m http.server
     
     # Using Node.js and npm
     npm install -g http-server
     http-server
     ```
   - For deployment, you can use Firebase Hosting or any other web hosting service

## Usage

- **Guests**: Access the main URL to submit song requests
- **DJs**: Access the DJ console via `/pages/dj.html` to manage requests

## Security Considerations

For a production environment, implement proper Firebase security rules and consider adding authentication for the DJ interface.

## License

MIT