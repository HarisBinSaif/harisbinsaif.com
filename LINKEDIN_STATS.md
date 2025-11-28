# LinkedIn Post Engagement Stats

## How It Works

The LinkedIn modal uses LinkedIn's embed feature, which **automatically displays real-time engagement stats** (likes, comments, shares) inside the embedded post. You don't need to manually update these - they're fetched live by LinkedIn.

## Showing Stats on Preview Cards

If you want to show engagement stats on the preview cards (before opening the modal), you have a few options:

### Option 1: Manual Updates (Simplest)
Update the `likes`, `comments`, and `shares` values in `src/components/LinkedInFeed.jsx`:

```javascript
const posts = [
  {
    id: 1,
    title: 'Old Data Engineer Writes ETL Scripts',
    excerpt: '...',
    date: 'Recent',
    likes: 42,      // Update manually
    comments: 5,    // Update manually  
    shares: 2,      // Update manually
    url: '...',
  },
]
```

### Option 2: Backend Service (Advanced)
Create a backend service that periodically fetches stats from LinkedIn and stores them. Then your frontend can fetch from your API.

### Option 3: Just Use Modal (Recommended)
The embedded post in the modal automatically shows all real-time stats, so you don't need to show them on the preview cards.

## Current Setup

- ✅ Modal shows real engagement stats automatically
- ⚠️ Preview cards currently show 0 or require manual updates
- ✅ Clicking a post opens a modal with the full LinkedIn embed

## Note

LinkedIn doesn't provide a public API for fetching engagement stats without authentication. The embed feature is the easiest way to show real stats without building a complex backend service.

