# Multi-Profile Personas — WhatsApp Concept Demo

## 🚀 One-line pitch
Create multiple profile personas and control which contacts see which profile picture and name — a privacy & personalization feature for WhatsApp.

---

## 📝 Features
- Create, edit, delete multiple profiles (Work, Friends, Family, etc.)
- Per-profile visibility rules:
  - Everyone
  - My contacts
  - Custom (allow only specific contacts)
- Preview how each contact sees your profile
- Contacts sidebar with last message previews
- Persistent data using `localStorage`
- Polished UI using Tailwind CSS
- Fully interactive demo in the browser

---

## 💻 How to run locally
1. Clone or download this repository
2. Open `index.html` in your browser
3. Profiles and contacts are preloaded; you can create new profiles and assign visibility rules
4. Click on a contact to preview what they see

---

## 🌐 Deployment
- Recommended: Vercel or Netlify (static site)
- Simply drag the project folder into Vercel/Netlify dashboard, deploy, and share the URL

---

## 🏗 Architecture
- **HTML/CSS**: Tailwind + small custom overrides (`styles.css`)
- **JavaScript Modules**:
  - `data.js` → default contacts/profiles & helper functions
  - `storage.js` → localStorage wrapper
  - `ui.js` → render all DOM elements, profile editor, chat preview
  - `app.js` → main controller: event handling, profile selection logic
- **Key function**: `getProfileForContact(contactId)` → determines which profile a contact sees
- **Templates**: HTML `<template>` tags for profiles and contacts list

---

## 🎥 Demo Script (45–90 seconds)
1. Open app → show Profiles list and active profile.
2. Create a new "Work" profile and set visibility to custom, allowing "Boss".
3. Click contact "Boss" and show the chat header → demonstrates how Boss sees your work DP.
4. Create a "Friends" profile → show different contact preview.
5. Reload page → demonstrate persistence.
6. Explain privacy & UX benefit in 15 seconds.

---

## 📌 Recruiter Outreach Template

**LinkedIn DM / Email Script:**

> Hi [Recruiter Name],  
> I’m a 3rd-year CS student and I built a small prototype demonstrating multi-profile personas for WhatsApp. It shows per-contact visibility, profile preview, and privacy-focused UX.  
> Here’s the link to the live demo & GitHub: [Demo URL / GitHub URL]  
> I’d love to discuss internship opportunities where I can contribute to messaging app products.  
> Thank you!  
> — [Your Name]

> **Tips:**  
> - Send **private message**, not public.  
> - Include **GitHub & live demo URL**.  
> - Keep message **short and professional**.

---

## 📂 File Structure
