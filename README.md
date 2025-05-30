# Firebase Community App

A secure community platform built with React and Firebase. This application includes user authentication, protected routes, and a community page where authenticated users can share posts.

## Features

- User registration and login with Firebase Authentication
- Protected routes for authenticated users
- Community page with real-time posts
- Secure Firebase configuration management
- Responsive design with Bootstrap

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)
- [Firebase CLI](https://firebase.google.com/docs/cli) (for deployment)

## Local Development Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd firebase-community-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up Firebase**

- Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable Authentication (Email/Password) and Firestore Database
- Register a new web app in your Firebase project

4. **Configure environment variables**

- Copy the `.env.example` file to `.env`:
  ```bash
  cp .env.example .env
  ```
- Open the `.env` file and replace the placeholder values with your Firebase configuration:
  ```
  REACT_APP_FIREBASE_API_KEY=your-api-key
  REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
  REACT_APP_FIREBASE_PROJECT_ID=your-project-id
  REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
  REACT_APP_FIREBASE_APP_ID=your-app-id
  ```

5. **Start the development server**

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Deployment to Firebase

1. **Build the application**

```bash
npm run build
```

2. **Initialize Firebase (if not already done)**

```bash
firebase login
firebase init
```

During initialization:
- Select Hosting and Firestore
- Select your Firebase project
- Use "build" as the public directory
- Configure as a single-page app
- Don't overwrite index.html

3. **Deploy to Firebase**

```bash
npm run build
firebase deploy
```

4. **Environment Variables in Production**


## Security Best Practices

1. **Environment Variables**
   - Never commit your `.env` file to version control
   - Use environment variables for all sensitive configuration

2. **Firestore Security Rules**
   - The application includes Firestore security rules that:
     - Allow only authenticated users to read posts
     - Allow users to create posts only if they are authenticated
     - Allow users to update/delete only their own posts

3. **Authentication**
   - The application uses Firebase Authentication for secure user management
   - Protected routes ensure that only authenticated users can access certain pages

## Project Structure

```
firebase-community-app/
├── public/                 # Static files
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── Home.js         # Homepage component
│   │   ├── Login.js        # Login component
│   │   ├── Register.js     # Registration component
│   │   ├── Community.js    # Community page component
│   │   └── Navigation.js   # Navigation bar component
│   ├── contexts/           # React contexts
│   │   └── AuthContext.js  # Authentication context
│   ├── App.js              # Main application component
│   ├── App.css             # Application styles
│   ├── index.js            # Entry point
│   ├── index.css           # Global styles
│   └── firebase.js         # Firebase configuration
├── .env.example            # Example environment variables
├── .gitignore              # Git ignore file
├── firebase.json           # Firebase configuration
├── firestore.rules         # Firestore security rules
├── firestore.indexes.json  # Firestore indexes
└── package.json            # npm package configuration
```

## License

This project is licensed under the MIT License.