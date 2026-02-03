# Traitors Gold Tracker

A simple web app to track the gold amount in the Traitors game. Features a beautiful dark/gold themed display with animated coins.

## Pages

- **Display Page** (`/`) - Shows the current gold amount with animated falling coins
- **Control Page** (`/control`) - Set the gold amount

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Upstash Redis

1. Go to [Upstash Console](https://console.upstash.com)
2. Sign up for a free account
3. Create a new Redis database (free tier is fine)
4. Copy your credentials from the database details page

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Upstash credentials:

```
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

### 4. Run Locally

```bash
npm run dev
```

Visit:
- http://localhost:3000 - Display page
- http://localhost:3000/control - Control page

## Deploy to Vercel

### 1. Push to GitHub

Make sure your code is pushed to a GitHub repository.

### 2. Import to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Import your GitHub repository

### 3. Add Environment Variables

In the Vercel project settings, add these environment variables:

- `UPSTASH_REDIS_REST_URL` - Your Upstash REST URL
- `UPSTASH_REDIS_REST_TOKEN` - Your Upstash REST token

### 4. Deploy

Vercel will automatically deploy your app. You'll get URLs like:
- `https://your-project.vercel.app` - Display page
- `https://your-project.vercel.app/control` - Control page

## Usage

1. Open the control page (`/control`) on your phone or laptop
2. Enter a gold amount and click "Set Gold"
3. Open the display page (`/`) on a TV or large screen
4. Refresh the display page to show the updated gold amount

## Tech Stack

- Next.js 14 (App Router)
- Upstash Redis (serverless Redis)
- CSS animations (no extra dependencies)
