<!-- Banner -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=150&section=header&text=📚%20Library%20Management%20System%20(LMS)%20📖&fontSize=35&animation=fadeIn&fontAlignY=35" alt="banner" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React Badge"/>
  <img src="https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white" alt="Vite Badge"/>
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white" alt="TypeScript Badge"/>
  <img src="https://img.shields.io/badge/TailwindCSS-Dark%20Theme-38B2AC?logo=tailwindcss&logoColor=white" alt="Tailwind Badge"/>
  <img src="https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase&logoColor=black" alt="Firebase Badge"/>
</p>  

---

# 📖 Overview  

The **Library Management System (LMS)** is a responsive web app for cataloging, tracking, and managing books.  
Built with **React + Vite** and powered by **Firebase Firestore**, it delivers:  

- ⚡ Real-time availability updates  
- 🎨 A sleek dark UI with mint accents  
- 🔒 Secure data persistence  
- 🔍 Fast, intuitive search  

---

# ✨ Features  

| Feature | Description | Technical Highlight |
| ------- | ----------- | ------------------- |
| Real-Time Catalog | Instantly syncs across all users | Firebase Firestore |
| Book Management | Add Title, Author, ISBN, Year, Genre | React Forms + Firestore |
| Status Toggling | One-click Borrowed ↔ Returned | Firestore document updates |
| Search | Quick client-side search | useState + Array filtering |
| Dark Theme | Custom Tailwind palette | TailwindCSS (dark mode) |
| Persistence | Secure cloud storage | Firebase Firestore |

---

# 🛠️ Tech Stack  

| Layer | Tools |
|-------|-------|
| **Frontend** | React (Vite) |
| **Language** | TypeScript |
| **Styling** | TailwindCSS (Dark + Mint) |
| **State** | React Hooks (useState, useEffect) |
| **Database** | Firebase Firestore |
| **Auth** | Firebase Authentication |

---

# 🚀 Getting Started  

### Prerequisites  
- Node.js  
- pnpm  

### Installation  

```bash
# Clone repo
git clone [YOUR_GITHUB_REPO_URL]
cd library-management-system

# Install dependencies
pnpm install
```

### Firebase Setup  
1. Create a Firebase project  
2. Enable **Firestore** + **Anonymous Auth**  
3. App connects automatically with Canvas env vars:  
   `__firebase_config`, `__initial_auth_token`  

### Run Locally  

```bash
pnpm run dev
```

App runs at → [http://localhost:5173/](http://localhost:5173/)  

---

## 📸 Demo

### Dashboard View  
![Dashboard Screenshot](./screenshots/dashboard.png)

**Live Demo:** [Visit live app](https://library-management-system-phi-three.vercel.app/)

### Add Book Form  
![Add Book Screenshot](./screenshots/add-book.png)

---

# 🤝 Contribution  

Contributions welcome!  
1. Fork repo  
2. Create feature branch  
3. Open PR  

---

# 📧 Contact  

**Hussein Salim** – Full-Stack Developer  

<p align="center">
  <a href="https://linkedin.com/in/husseinsalim" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin" alt="LinkedIn"/>
  </a>
  <a href="mailto:2025salimh@gmail.com">
    <img src="https://img.shields.io/badge/Email-Say%20Hello-D14836?style=for-the-badge&logo=gmail" alt="Email"/>
  </a>
  <a href="https://www.digitalhus.com/" target="_blank">
    <img src="https://img.shields.io/badge/Portfolio-View%20Live-000000?style=for-the-badge&logo=vercel" alt="Portfolio"/>
  </a>
</p>  

---

<!-- Footer -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=120&section=footer" alt="footer" />
</p>
