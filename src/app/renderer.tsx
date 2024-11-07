import React from 'react'
import { createRoot } from 'react-dom/client'
import { NoteWidget } from './components/NoteWidget'
import 'bootstrap/dist/css/bootstrap.min.css';
import { App } from './App';

console.log('👋 This message is being logged by "renderer.ts", included via Vite');

const container = document.getElementById('app')
const root = createRoot(container!)

root.render(<App />)
