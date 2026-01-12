# Deploying CamerFarmAI to Vercel

## 1. Prerequisites
- A Vercel account (https://vercel.com)
- Your project pushed to GitHub (Already done!)

## 2. Configuration Settings
Your project uses the following environment variables which need to be configured in Vercel:

| Variable | Description | Value (Example) |
|----------|-------------|-----------------|
| `VITE_API_URL` | URL of your Backend API | `https://api.your-backend.com` |

## 3. Deployment Steps on Vercel Dashboard

1.  **Log in** to your Vercel account.
2.  Click **"Add New..."** > **"Project"**.
3.  **Import Git Repository**: Find the `CamerFarmAI` repo (or whatever you named it) in the list and click **"Import"**.
4.  **Configure Project**:
    *   **Project Name**: Leave as is or change if desired.
    *   **Framework Preset**: Vercel should auto-detect **"Vite"**. If not, select it manually.
    *   **Root Directory**: If your frontend is in a subdirectory (e.g., `Frontend/CamerFarmAI`), click "Edit" and select that folder. If it's the root of the repo, leave it. *Based on your workspace, it seems to be in a subdirectory `Frontend/CamerFarmAI`.*
    *   **Build & Output Settings**:
        *   Build Command: `npm run build` (Default)
        *   Output Directory: `dist` (Default)
        *   Install Command: `npm install` (Default)
    *   **Environment Variables**:
        *   Expand this section.
        *   Add `VITE_API_URL` and set the value to your live backend URL.
5.  Click **"Deploy"**.

## 4. SPA Routing Configuration (Recommended)
To ensure the application works correctly when users refresh a page (not the homepage), you should create a `vercel.json` file in the root of your frontend project (`d:\...\Frontend\CamerFarmAI`).

**Create file: `vercel.json`**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
*Note: This tells Vercel to serve `index.html` for all routes, allowing React Router to handle the navigation.*

## 5. After Deployment
- Vercel will build your project and give you a URL (e.g., `camerfarmai.vercel.app`).
- Test navigation and API calls.
