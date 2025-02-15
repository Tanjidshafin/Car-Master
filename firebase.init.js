// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDmgDZsjz-u_IdpaRpN5j7jr4CxMJm19-Y',
  authDomain: 'car-master-8d44e.firebaseapp.com',
  projectId: 'car-master-8d44e',
  storageBucket: 'car-master-8d44e.firebasestorage.app',
  messagingSenderId: '775129223478',
  appId: '1:775129223478:web:94d3f03c19de11592d2397',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
