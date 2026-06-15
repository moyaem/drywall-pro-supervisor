# DrywallPro — Supervisor Edition

Professional job tracking for drywall supervisors. Track subdivisions, lots, crew, materials, and analytics — all from your phone, fully offline.

**Live App:** https://moyaem.github.io/drywall-pro-supervisor/

---

## 📱 Install as an App (No App Store Required)

This is a **Progressive Web App (PWA)** — it installs directly from the browser and works like a native app, including offline support.

### iPhone / iPad (iOS 16.4+)
1. Open **Safari** and go to https://moyaem.github.io/drywall-pro-supervisor/
2. Tap the **Share** button (box with arrow pointing up)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"** — the DrywallPro icon will appear on your home screen
5. Open it from the home screen — it runs fullscreen like a native app

> ⚠️ Must use Safari on iOS. Chrome/Firefox on iPhone cannot install PWAs.

### Android (Chrome)
1. Open **Chrome** and go to https://moyaem.github.io/drywall-pro-supervisor/
2. Chrome will show a banner at the bottom: **"Add DrywallPro to Home screen"** — tap it
3. Or tap the **⋮ menu** → **"Add to Home screen"** / **"Install app"**
4. Tap **"Install"** — the app icon appears on your home screen and app drawer

### Desktop (Chrome / Edge)
1. Go to https://moyaem.github.io/drywall-pro-supervisor/
2. Click the **install icon** (⊕) in the address bar
3. Click **"Install"**

---

## 🚀 Deploy to GitHub Pages

### Files required in your repo root:
```
index.html              ← Main app (rename drywall-supervisor.html → index.html)
manifest.json           ← PWA manifest
sw.js                   ← Service worker
icon-192.png            ← App icon 192×192
icon-512.png            ← App icon 512×512
icon-maskable-192.png   ← Maskable icon 192×192 (Android)
icon-maskable-512.png   ← Maskable icon 512×512 (Android)
icon-180.png            ← Apple touch icon 180×180
.nojekyll               ← Disables Jekyll (required for sw.js to be served)
```

### Steps:
1. Rename `drywall-supervisor.html` → `index.html`
2. Push all files above to the `main` branch of `moyaem/drywall-pro-supervisor`
3. Go to **Settings → Pages** in your GitHub repo
4. Set Source to **"Deploy from a branch"**, branch = `main`, folder = `/ (root)`
5. Save — GitHub Pages will deploy within ~60 seconds
6. Visit https://moyaem.github.io/drywall-pro-supervisor/ to confirm

---

## 📦 Features

- **Subdivisions & Jobs** — Track every lot across all subdivisions with inline editing
- **Stage Pipeline** — Pending → Stocked → Hanging → Taped → Floated → Skimmed → Sanded
- **Crew Management** — Hangers, finishers, sanders with job counts
- **House Measurement** — Board tally by location with sq footage calculator
- **Analytics** — Scrap rate, slippage, trade obstructions, site readiness, framing defects
- **Materials Tracking** — Per-lot supply needs with quantities
- **Reminders** — Per-lot and global reminders with due dates
- **Offline** — Full offline support via service worker; data stored in localStorage
- **Export/Import** — JSON and CSV export for all data

---

## 🔧 Data & Privacy

All data is stored **locally on your device** using `localStorage`. Nothing is sent to any server. Exporting creates a JSON file you can back up anywhere.

---

*Built for field use. Designed for one-handed operation on a job site.*
