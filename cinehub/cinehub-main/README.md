# Cinema Hub - Link in Bio

This is a Next.js "link in bio" page created with Firebase Studio. It's designed to be a fast, mobile-first, app-like landing page for your social media profiles.

## Quick Start

### 1. Customize Your Content

All user-facing text, links, and profile information can be edited in one place.

- **File to edit:** `src/lib/config.ts`

Open this file and replace the placeholder values with your own information. This includes your name, bio, avatar, social media links, and the URLs for your main call-to-action buttons.

```typescript
// src/lib/config.ts

export const config = {
  name: "Your Name",
  // ...
  links: {
    spreadsheet: "YOUR_SPREADSHEET_LINK_HERE",
    letterboxd: "YOUR_LETTERBOXD_LINK_HERE",
    // ...
  },
  socials: {
    tiktok: "YOUR_TIKTOK_LINK_HERE",
    // ...
  },
};
```

### 2. Change Your Avatar

- Replace the placeholder image `public/avatar.png` with your own picture. Keep the same filename or update the path in `src/lib/config.ts`.

### 3. Deploy Your Site

This project is ready to be deployed on Firebase App Hosting.

- **Connect to Firebase:** If you haven't already, connect your project to a Firebase project.
- **Deploy:** Deploy your site by running the deploy command from your terminal:

```bash
firebase deploy
```

That's it! Your personalized link-in-bio page will be live.
