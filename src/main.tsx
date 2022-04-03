import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { SaveProvider } from './contexts/saveContext'

ReactDOM.render(
  <React.StrictMode>
    <SaveProvider>
      <App />
    </SaveProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
