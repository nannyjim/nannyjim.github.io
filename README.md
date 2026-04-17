# AI Mastery for Aerospace — GitHub Pages Deployment

A self-contained interactive course that runs directly from GitHub Pages. No build step required.

## What's in this bundle

```
/
├── index.html          ← The app (React + Babel loaded from CDN)
├── manifest.json       ← PWA manifest
├── sw.js               ← Service worker for offline support
├── icons/
│   ├── icon-192.png    ← PWA icon
│   └── icon-512.png    ← PWA icon (high-res)
└── README.md           ← This file
```

## Quick deploy: 5-minute GitHub Pages setup

### 1. Create a GitHub repository

- Go to [github.com/new](https://github.com/new)
- Name it something like `ai-aerospace-course` (or any name you want)
- Make it **Public** (required for free GitHub Pages)
- Check "Add a README file"
- Click **Create repository**

### 2. Upload the files

**Option A — Via web interface (easiest):**
1. On your new repo page, click **Add file → Upload files**
2. Drag the entire contents of this folder (`index.html`, `manifest.json`, `sw.js`, and the `icons` folder) into the upload zone
3. Scroll down, enter a commit message like "Initial deploy", and click **Commit changes**

**Option B — Via git command line:**
```bash
git clone https://github.com/YOUR_USERNAME/ai-aerospace-course.git
cd ai-aerospace-course
# Copy the files from this bundle into the cloned folder
cp -r /path/to/this/bundle/* .
git add .
git commit -m "Initial deploy"
git push origin main
```

### 3. Enable GitHub Pages

1. In your repo, go to **Settings** (top navigation)
2. Click **Pages** in the left sidebar
3. Under **Build and deployment → Source**, select **Deploy from a branch**
4. Set **Branch** to `main` and folder to `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for the first deploy

### 4. Visit your site

Your course will be live at:
```
https://YOUR_USERNAME.github.io/ai-aerospace-course/
```

GitHub shows this URL near the top of the Pages settings once deployed.

## Install as an app on your iPhone

Once the site is live:

1. Open the URL in **Safari** on your iPhone (Chrome won't install the PWA on iOS)
2. Tap the **Share** button (square with up arrow)
3. Scroll down and tap **Add to Home Screen**
4. Tap **Add** in the top right

You'll now have an icon on your home screen that launches the course in full-screen mode, works offline after first load, and saves your progress across sessions.

## Install on Android

1. Open the URL in **Chrome** on your Android device
2. Tap the **three-dot menu** in the top right
3. Tap **Install app** (or **Add to Home screen**)
4. Confirm **Install**

## Install on desktop (Chrome / Edge)

1. Open the URL in Chrome or Edge
2. Look for the **install icon** in the address bar (small computer with a down arrow)
3. Click it and confirm **Install**

The app will open in its own window and show up in your applications.

## Updating the course later

To update content:

1. Edit `index.html` (the course content lives in the `LESSONS` array near the top of the `<script>` tag)
2. Bump the `CACHE_NAME` in `sw.js` (e.g., `'ai-aerospace-v1'` → `'ai-aerospace-v2'`) so the service worker refreshes cached files
3. Commit and push — GitHub Pages will redeploy in 1-2 minutes

Installed PWA users will pick up the new version on their next app launch.

## Troubleshooting

**Site shows 404 after enabling Pages**
Wait 2-3 minutes. First deploys take longer. Refresh the Pages settings to see the live URL once ready.

**"Loading course…" stays forever**
Your browser blocked one of the CDN scripts. Try a different browser or check the browser console (F12) for errors. The CDNs used are `unpkg.com` for React and `@babel/standalone`.

**YouTube videos show black screen**
YouTube embed issues are usually browser-specific. The course's default video card opens videos in a new YouTube tab — use that path if the embedded player doesn't load.

**Progress not saving**
Private/incognito mode often blocks localStorage. The course displays a warning banner in the sidebar when this happens. Use a normal browser window to preserve progress.

**"Install" option not showing on iPhone**
iOS requires Safari specifically. Chrome, Firefox, and Edge on iOS can't install PWAs.

## Custom domain (optional)

If you want to use your own domain instead of `YOUR_USERNAME.github.io/...`:

1. In your repo, create a file named `CNAME` at the root with just your domain on one line:
   ```
   course.yourdomain.com
   ```
2. In your domain registrar's DNS settings, add a CNAME record pointing `course` to `YOUR_USERNAME.github.io`
3. In GitHub Pages settings, enter the custom domain and enable HTTPS
4. Wait 10-30 minutes for DNS to propagate

## Development tip

You can test locally before uploading:

```bash
# From inside the bundle folder
python3 -m http.server 8000
# Then open http://localhost:8000
```

The service worker only works when served over HTTP(S), not `file://`, so always use a local server.
