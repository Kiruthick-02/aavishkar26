## Project Summary
AAVISHKAR'26 is a college event management system for an annual tech fest. It handles user authentication, event exploration, tier-based ticket purchases, and event registrations. The system also syncs registration data to Excel for administrative use.

## Tech Stack
- Framework: Next.js (App Router, Turbopack)
- Styling: Tailwind CSS, Framer Motion
- Database & Auth: Firebase (v12 SDK) & Firebase Admin
- Payments: Stripe
- Utilities: xlsx, lucide-react, clsx, tailwind-merge

## Architecture
- `src/app`: Routes and page components
- `src/components`: Reusable UI components
- `src/lib`: Firebase clients, Stripe, and utility functions
- `src/hooks`: Custom React hooks
- `registrations`: (Virtual) Excel file management

## User Preferences
- Theme Colors: Blue shades with gold, white, and grey accents.
- Modern, clean UI with animations (Framer Motion).
- Firebase for unified Auth and Database.

## Project Guidelines
- Use functional components and TypeScript.
- No comments unless requested.
- Relative URLs for client-side API calls.
- Digital tickets displayed in user profile.

## Common Patterns
- Firebase Auth for data fetching and authentication.
- Firestore for unstructured event and profile data.
- Stripe for payment processing.
- XLSX for data export/sync logic.
