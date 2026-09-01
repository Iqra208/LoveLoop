# ❤️ SoulMatch AI

**AI-powered matchmaking web application with a real Gemini AI backend.**

## What changed to address the AI-verification objection

The original prototype used hard-coded JavaScript match scores. This version adds a **real server-side Gemini API integration**:

1. The user completes the personality quiz.
2. The browser sends the quiz answers, values and interests to `POST /api/match`.
3. Vercel runs `api/match.js`.
4. `api/match.js` sends the profile + candidate data to **Google Gemini (`gemini-3.7-flash`)**.
5. Gemini returns compatibility scores, explanations, strengths and advice.
6. The UI updates the candidate ranking with the AI-generated score.
7. `POST /api/icebreaker` also generates a unique AI conversation starter for a selected profile.

The API key is kept in the Vercel server environment and is **not exposed in frontend JavaScript**.

## Main features

- Responsive matchmaking UI
- Personality quiz
- **Real Gemini AI compatibility analysis**
- AI-generated compatibility explanation
- AI-generated icebreakers
- Dynamic match ranking
- Profile cards and filters
- Authentication UI
- Chat/profile/admin showcase screens
- Vercel serverless API
- Secure server-side API-key handling

## Technology stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Tailwind CSS CDN

### AI / Backend
- Google Gemini API
- Vercel Serverless Functions
- Node.js runtime
- `GEMINI_API_KEY` environment variable

### Deployment
- Vercel

## Setup

### 1. Get a Gemini API key
Create a Gemini API key in Google AI Studio.

### 2. Configure Vercel
In the Vercel project settings, add:

```text
GEMINI_API_KEY=YOUR_REAL_KEY
```

Then redeploy.

For local development, copy `.env.example` to `.env.local` and add the key. Never commit the real key.

### 3. Run/deploy

The site is a static frontend plus Vercel serverless API routes.

- Open `index.html` for the UI.
- Deploy the repository to Vercel.
- The `/api/match` and `/api/icebreaker` routes are automatically deployed as serverless functions.

## Demonstration for project defense

### AI Compatibility
Click **“Analyze My Compatibility with Gemini”**. The browser makes a network request to `/api/match`. The server function calls Gemini and returns an AI-generated ranking.

### AI Icebreaker
Click **“AI Icebreaker”** under a candidate. The browser calls `/api/icebreaker`, which asks Gemini to create a conversation starter based on the candidate's supplied interests.

### How to prove the AI call
Open browser **DevTools → Network**, run the AI Match Analysis, and show:

```text
POST /api/match
200 OK
```

The Vercel function then performs the server-side request to the Gemini API. The API key is not visible to the browser.

## Project structure

```text
NovaStack--main/
├── api/
│   ├── match.js
│   └── icebreaker.js
├── index.html
├── package.json
├── vercel.json
├── .env.example
├── README.md
├── AI.png
├── Admin.png
├── Chat.png
├── Dashboard.png
├── Login.png
└── Profile.png
```

## Important academic note

The application is a functional web MVP. Authentication, chat persistence, database storage and production user accounts would require a database/authentication service in a full production release. The AI integration itself is real and server-side; it is not a hard-coded fake LLM response.

## Live demo

https://nova-stack-eight.vercel.app/
