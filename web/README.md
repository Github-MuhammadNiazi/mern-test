# Mini Feed React SPA

This project is a Vite + React + TypeScript single-page application featuring:

- **Login form**: Authenticates via `/login` and stores JWT in memory (React Context).
- **Feed page**: Fetches posts from `/feed` and displays them with infinite scroll (10 items at a time).
- **Custom hook `useApi`**: Handles API calls with caching, loading, and error management.
- **Optimized rendering**: Only new feed items mount/unmount during infinite scroll.

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure
- `src/context/AuthContext.tsx`: Auth context for JWT state.
- `src/hooks/useApi.ts`: Custom API hook with caching.
- `src/pages/Login.tsx`: Login form.
- `src/pages/Feed.tsx`: Feed with infinite scroll.
- `src/App.tsx`: Main app logic (auth/route switch).

---

*This project was bootstrapped with Vite and customized for a mini-feed scenario.*
