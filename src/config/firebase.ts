import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyADj4tf65DjTOF29MW7xGO0OVRHs_cYDdg",
  authDomain: "dcc-nr-dashboard.firebaseapp.com",
  projectId: "dcc-nr-dashboard",
  storageBucket: "dcc-nr-dashboard.firebasestorage.app",
  messagingSenderId: "648912013604",
  appId: "1:648912013604:web:f7824a262657ef8ca14bb1",
  measurementId: "G-P0VDLG0LCR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 