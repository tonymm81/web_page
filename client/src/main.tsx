import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleReCaptchaProvider
    reCaptchaKey={import.meta.env.VITE_GOOGLE_CAPTCHA_SITEKEY}
    scriptProps={{
      async: true,
      defer: true,
      appendTo: 'head' // tärkeää: lataa HEADiin
    }}
  >
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  </GoogleReCaptchaProvider>,
)
