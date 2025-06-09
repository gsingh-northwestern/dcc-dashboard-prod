# Disability Accommodations Dashboard

A modern web application for managing and collaborating on disability accommodation recommendations.

## Features

- Real-time collaboration using Firebase
- Modern, responsive UI built with Material-UI
- Search and filter recommendations
- Edit recommendations with a user-friendly interface
- View statistics and insights on the dashboard
- Category-based organization
- Source and tag management

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Firebase account and project

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Usage

1. **Dashboard**: View summary statistics and quick access to recommendations
2. **Recommendations**: Browse, search, and edit recommendations
   - Use the search bar to find specific recommendations
   - Filter by category using the dropdown
   - Click the edit icon to modify a recommendation
   - Add or remove source tags and need tags

## Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to Firebase Hosting:
```bash
firebase deploy
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
