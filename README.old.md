Browser
|
| POST /api/improve-prompt
v
Vercel Serverless Function
|
| OPENROUTER_API_KEY (server-side only)
v
OpenRouter API
|
v
AI Model


The frontend never accesses AI provider credentials directly.

## Environment variables

Configure these in Vercel:

| Variable | Required | Description |
|---|---|---|
| `OPENROUTER_API_KEY` | Yes | Server-side API key for OpenRouter |

Example:

```env
OPENROUTER_API_KEY=your_key_here

Never expose this value in frontend code.

API
POST /api/improve-prompt

Request:

{
  "prompt": "create a login page"
}

Success:

{
  "success": true,
  "prompt": "optimized prompt..."
}

Errors:

{
  "success": false,
  "error": "message"
}
Local development

Install dependencies:

npm install

Run development server:

npm run dev

Build:

npm run build

The build process also verifies that private AI configuration is not leaked into the frontend bundle.

Project structure
api/
 └── improve-prompt.ts     Serverless AI proxy

src/
 ├── lib/
 │    └── ai-service.ts    Browser API client
 └── pages/
      └── PromptLabPage.tsx
Security
API keys are stored only in server-side environment variables.
The browser never receives provider credentials.
The frontend communicates only with the application API.
Production bundles are checked to prevent accidental secret exposure.