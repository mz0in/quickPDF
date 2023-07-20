import React from 'react'
import ReactDOM from 'react-dom/client'

import MainComponent from './MainComponent'

// Get the root element to render the React app
const rootElement = document.getElementById('root')

// Ensure that the root element exists before rendering
if (!rootElement) {
  throw new Error('Root element with id "root" not found.')
}

// Create a root for the React app and render the MainComponent inside it.
// We use StrictMode to highlight potential problems in the application.
// StrictMode doesn't render any visible UI. It only activates additional checks and warnings.
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <MainComponent />
  </React.StrictMode>
)
