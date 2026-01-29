import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCWR51xaj3fcjjDdEjULawN_osc58syPJA",
  authDomain: "rent4student.firebaseapp.com",
  projectId: "rent4student",
  storageBucket: "rent4student.firebasestorage.app",
  messagingSenderId: "12407205943",
  appId: "1:12407205943:web:9173de723cd53747d68fb2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
