# StockSense

StockSense is a full-stack inventory management project. The browser UI uses plain HTML, CSS, and JavaScript. A dependency-free Node.js server serves the site and provides JSON API endpoints. Inventory data and user accounts persist in a local JSON database.

## Run locally

1. Install Node.js 18 or newer if it is not already installed.
2. Open this project folder in VS Code.
3. Choose **Terminal → New Terminal** and run:

   ```bash
   npm start
   ```

   Or run `node server.js` if npm is unavailable.

4. Keep the terminal open and visit [http://localhost:8000](http://localhost:8000).
5. Create an account on the sign-up screen. The dashboard opens after account creation.

## Turn on real sign-in providers

The app includes the provider integrations, but Google, email, and SMS accounts belong to you and require your credentials. Copy `.env.example` to `.env`, then fill in the provider values. Keep `.env` private; it is ignored by Git.

- **Google:** Create a Web OAuth client in Google Cloud. Add `http://localhost:<port>/auth/google/callback` as an authorized redirect URI, replacing `<port>` with the port StockSense runs on. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`; set `BASE_URL` to the matching local origin if needed.
- **Email OTP:** Create a Resend API key, verify a sender domain, then set `RESEND_API_KEY` and a verified `MAIL_FROM` address. Password reset codes are sent as email.
- **Mobile OTP:** Configure Twilio SMS, then set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_FROM`. Add a mobile number to your profile in Settings, using international format such as `+14155550123`.
- **AI Help Center:** Create a Gemini API key in [Google AI Studio](https://aistudio.google.com/) and set `GEMINI_API_KEY` in `.env`. The key stays on the server. Questions and a limited inventory snapshot are sent to Gemini. Set `GEMINI_MODEL` if needed. OpenAI is also supported through optional `OPENAI_API_KEY`; Gemini is used when both are set. Without either key, local inventory help still works for common questions.

Restart `npm start` after editing `.env`. Without provider keys, development mode displays the email/SMS test code in the app so you can try the flows locally. Google sign-in needs its OAuth client configured before it can complete.

Stop the server with **Ctrl+C**. Do not also run Python's `http.server`; the Node server serves both the frontend and API on port 8000.

## Features

- Account registration and sign-in with salted PBKDF2 password hashes
- Password sign-in errors shown inline, email OTP password reset, Google OAuth, and SMS OTP sign-in
- Development OTPs are shown in the app/terminal when email/SMS credentials are not configured
- Authenticated inventory API and token-based sign-out
- Live inventory updates pushed to other open sessions, with a connection indicator
- AI Help Center using Gemini or OpenAI APIs, with local inventory answers when no key is configured
- Dashboard KPIs, low-stock list, recent operations, and filters
- Product creation/editing, search, stock thresholds, and CSV export
- Receipts, delivery orders, internal transfers, adjustments, move history
- Warehouse overview and responsive workspace settings
- Persistent inventory and accounts in `data/stock-data.json`

## Project files

- `server.js` — Node.js static server, authentication, and inventory API
- `data/seed.json` — initial sample catalog and operations
- `index.html`, `login.html` — application and account screens
- `styles.css` — responsive styling
- `app.js` — dashboard screens and API integration
- `package.json` — start command and Node version requirement
- `.env.example` — configuration template for Google, Resend email, and Twilio SMS

## Notes

The JSON database and live event stream are intended for a local project/demo. Open the app in two browser tabs on the same server to see saved inventory changes appear in both. Copy `.env.example` to `.env` and add provider credentials to enable Google OAuth, real email reset codes, and real SMS sign-in. Google OAuth also requires the exact callback URI `${BASE_URL}/auth/google/callback` to be registered for your web client. Follow the provider setup guides for [Google web-server OAuth](https://developers.google.com/identity/protocols/oauth2/web-server), [Resend email sending](https://resend.com/docs/api-reference/emails/send-email), and [Twilio SMS messaging](https://www.twilio.com/docs/messaging/api/message-resource). Without these credentials in development, the interface gives you a local test code instead of sending email or SMS. For internet deployment, set a public HTTPS `BASE_URL`, replace JSON storage with a shared database, and use a production session store.

The AI Help Center supports Gemini's `generateContent` API and OpenAI's Responses API. Keep provider keys in `.env` on the server and never commit or share them. Gemini free-tier limits and data terms apply; review [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing) before sending sensitive inventory data.
