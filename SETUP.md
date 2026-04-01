# Developer Setup & Installation 🛠️

If you are a hackathon judge or open-source contributor looking to run **Chitragupt** locally, follow the steps below. The platform operates primarily as an independent, decoupled Next.js `frontend` application mapped out to Firebase and serverless APIs.

---

## 1. Prerequisites
Ensure your local environment meets the following baseline requirements:
- **Node.js**: `v18.x` or higher (we recommend `v20.x` LTS)
- **NPM**: `v9.x` or higher
- **Git**: Installed and configured

---

## 2. Clone the Repository
Clone down the centralized codebase utilizing the standard HTTPS/SSH Git methods.
```bash
git clone https://github.com/bugWeiser/chitragupt.git
cd chitragupt
```

---

## 3. Environment Variables (.env.local)
The platform relies on Google Gemini for the core NLP logic. Create an `.env.local` file directly inside the `/frontend` directory.

1. Navigate to the frontend node:
   ```bash
   cd frontend
   ```
2. Create `.env.local`:
   ```bash
   touch .env.local
   ```
3. Add the following required API Key:
   ```env
   # Google AI Studio API Key
   # Used inside /app/api/analyze/route.ts
   GEMINI_API_KEY="your_actual_gemini_api_key_here"
   
   # Note: Firebase auth bindings are currently bypassed strictly for the demo environment 
   # via /lib/authService.ts mock objects to prevent environment constraint issues.
   ```

---

## 4. Install Dependencies
Run the standard Node Package Manager installation protocol to pull down `next`, `react`, `lucide-react`, `tailwind`, and all other localized libraries.

```bash
# Ensure you are inside the /frontend directory
npm install
```

---

## 5. Start the Development Server
Once dependencies and environment variables are locked, boot the local Next.js server.

```bash
npm run dev
```

The terminal will confirm the server is running on `http://localhost:3000`. 
**Open your web browser and navigate directly to this address.**

---

## 6. Build for Production / Vercel (Optional)
If you wish to test out the flattened production build natively to ensure there are no rendering conflicts (e.g. testing the `window.print()` wrappers), execute a local build.

```bash
npm run build
npm start
```

---

### Key Features to Test Locally
* **The Dynamic AI Core:** Navigate to `/analyze`, type a highly specific legal problem (e.g., "wife physically abused by husband's mother"), and watch the real-time Gemini routing immediately detect Section 498B flags.
* **Localization Handlers:** Change the global language to Hindi (हिन्दी) via the Navbar to test the robust JSON dictionary mappings in `/locales`.
* **RTI Compiler:** Navigate to `/rti`, fill the mocked data, and click "Download RTI PDF" to trigger the `window.print()` flattened rendering architecture.
