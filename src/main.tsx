import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from "./redux/app/store.tsx"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { App } from './App.tsx';

const clientId = process.env.GOOGLE_CLIENT_ID || ''


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
          <App />
      </GoogleOAuthProvider>
  </Provider>
)
