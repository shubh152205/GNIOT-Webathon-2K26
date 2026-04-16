# 🎗️ KalNahiAajDaan Foundation
**GNIOT Webathon 2K26 — NGO-ID #WB303**

A premium, modern web platform designed for the **KalNahiAajDaan Foundation** as part of the GNIOT Webathon 2K26. This platform seamlessly bridges the gap between those in need and those wanting to help through synchronized campaign funding, resource donation, and impact storytelling.

## 🔗 Live Demo (GitHub Pages)
- **🌍 Main Public Website**: [View Live](https://shubh152205.github.io/GNIOT-Webathon-2K26/)
- **🛠️ Admin Panel**: [View Admin Dashboard](https://shubh152205.github.io/GNIOT-Webathon-2K26/admin.html)

---

## 🌟 Core Features

### 🌍 Dynamic Public Site (`index.html`)
- **Interactive UI**: A single-page application (SPA) design boasting a glassmorphic dark theme, premium typographies (*Manrope* & *Inter*), and fluid CSS animations.
- **Campaign Funding**: Real-time integration of live campaigns that accept monetary and resource donations. 
- **Resource Donation Matrix**: Custom matrix allowing users to pick exact physical items (Books, Medic Kits, Rations) to directly fund instead of just arbitrary money.
- **Impact Stories**: Visually immersive grid displaying success and ongoing stories of the foundation.
- **Volunteer Vetting**: Secure volunteer onboarding flow.

### 🛠️ Dedicated Admin Dashboard (`admin.html`)
- **Live KPIs**: Automatically sums up Live Donors, Total Funds Raised, Active Campaigns, and Pending Volunteers.
- **Full CRUD Management**: Administrators can Create, Read, Update, and Delete both Campaigns and Stories. 
- **Image Handling**: Supports both file uploading (converts to Base64 instantly) and URL hotlinking for easy media management without a database.
- **Volunteer Processing**: Table interface to review, approve, or reject incoming volunteer applications.

### 🔄 LocalStorage Sync Engine
The entire application operates without a backend server, utilizing the browser's `localStorage` as a real-time reactive database. Any change (new donation, updated campaign, new story) made in the Admin Panel instantly updates the global data arrays used by the Main Site to ensure they are perfectly mirrored. 

---

## 💻 Tech Stack
- **Structure**: Semantic HTML5
- **Styling**: Vanilla CSS3 (Custom Variables, Flexbox/Grid, Keyframe Animations, Glassmorphism, CSS Modules concept)
- **Logic**: Vanilla JavaScript (ES6+, DOM Manipulation, LocalStorage JSON Data-layer, Base64 File API)
- **Icons**: Boxicons

---

## 📁 Project Structure

```
├── index.html        # The main public-facing NGO platform (SPA)
├── admin.html        # Secure administrative dashboard
├── styles.css        # Centralized design system and layout styling
├── script.js         # Core logic, DOM updates, and LocalStorage data sync
├── data.js           # Default seed arrays for campaigns, stories, and categories
├── images/           # Contains all local image assets and icons
└── README.md         # Project documentation (You are here!)
```

---

## 🚀 Getting Started Locally

Because this project uses vanilla web technologies and browser memory, running it locally requires zero installation or package managers:

1. Clone the repository: `git clone https://github.com/shubh152205/GNIOT-Webathon-2K26.git`
2. Simply double-click on `index.html` to open the public site in any modern browser.
3. Open `admin.html` simultaneously in another tab.
4. *Test the sync*: Add a campaign in the admin panel, then refresh the public site tab to see it instantly appear!

---
*Built with ❤️ for GNIOT Webathon 2K26 by Shubh.*
