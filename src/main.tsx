import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./index.css";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import ReactDOM from "react-dom/client";
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
