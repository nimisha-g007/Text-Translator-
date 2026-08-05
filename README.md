## Text Translator
A simple, clean web app for translating text between multiple languages, built with React + Vite and powered by the MyMemory Translation API. Includes basic usage analytics via Supabase.

## Live Demo
https://text-translator-nimisha.netlify.app/

## Features
Auto-detect source language — just type or paste text, no need to select the input language
Translate into 16+ languages, including English, German, Hindi, French, Italian, Japanese, Spanish, Swedish, Thai, Turkish, Serbian, Russian, Vietnamese, Korean, Chinese, and Nepali.

* Swap — instantly swap the input and translated text with one click
* Clear — reset both text boxes in one click
* Loading state — shows a spinner while translation is in progress
* Error handling — friendly error message if the translation request fails
* Usage analytics (via Supabase):
* Tracks total number of translations performed
* Tracks total number of app visits
* Responsive design — works on both desktop and mobile screens
* Minimal, distraction-free UI with a soft green/neutral color palette

## Tech Stack
Frontend: React, Vite
Styling: Inline styles + Tailwind utility classes
Icons: lucide-react
HTTP requests: Axios
Translation API: MyMemory Translated
Backend / Analytics: Supabase (Postgres + REST API)

## Getting Started
Prerequisites
Node.js (v18 or higher recommended)
## A free Supabase project
Installation
# Clone the repository
bash
   git clone https://github.com/your-username/text-translator.git
   cd text-translator
Install dependencies
bash
   npm install
   
# Create a .env file in the root directory with your Supabase credentials:
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   
# Set up Supabase tables In your Supabase project, create two tables: translations
Column	Type
id	int8 (PK)
created_at	timestamptz
target_language	text
app_views
Column	Type
id	int8 (PK)
created_at	timestamptz
Make sure Row Level Security (RLS) policies allow insert and select for the anon role, or disable RLS for testing.
Run the app locally
bash
   npm run dev
Open http://localhost:5173 in your browser

## Project Structure
text-translator/
├── src/
│   ├── App.jsx        # Main app component and UI
│   ├── supabase.js    # Supabase client setup
│   ├── main.jsx        # App entry point
│   ├── App.css
│   └── index.css
├── .env                # Environment variables (not committed)
├── .gitignore
├── package.json
└── README.md

## Roadmap / Ideas for Future Improvements
 Add copy-to-clipboard button for translated text
 Add text-to-speech playback
 Add dark mode
 Persist last-selected language in local storage
 Deploy as a PWA and publish to Play Store via Trusted Web Activity
