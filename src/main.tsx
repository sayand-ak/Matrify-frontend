import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./redux/app/store.tsx"
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = process.env.GOOGLE_CLIENT_ID || ''


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <GoogleOAuthProvider clientId={clientId}>
          <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
  </Provider>
)
