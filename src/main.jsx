// import React from 'react'
import ReactDOM from 'react-dom/client'
import { Offline, Online } from 'react-detect-offline'
import './index.css'
import AppOffline from './components/AppOffline/AppOffline'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Online>
      <App />
    </Online>
    <Offline>
      <AppOffline />
    </Offline>
  </>
)
