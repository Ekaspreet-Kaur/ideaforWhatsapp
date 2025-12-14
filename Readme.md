# Multi-Profile Personas — WhatsApp Concept Demo

## 
Create multiple profile personas and control which contacts see which profile picture and name — a privacy & personalization feature for WhatsApp.
 ## Live Demo
 check out the fully workinf idea concept here ideafor-whatsapp-1hhnqhwnh-ekaspreet-kaurs-projects.vercel.app
---

##  Features
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

##  How to run locally
1. Clone or download this repository
2. Open `index.html` in your browser
3. Profiles and contacts are preloaded; you can create new profiles and assign visibility rules
4. Click on a contact to preview what they see

---



##  Architecture
- **HTML/CSS**: Tailwind + small custom overrides (`styles.css`)
- **JavaScript Modules**:
  - `data.js` → default contacts/profiles & helper functions
  - `storage.js` → localStorage wrapper
  - `ui.js` → render all DOM elements, profile editor, chat preview
  - `app.js` → main controller: event handling, profile selection logic
- **Key function**: `getProfileForContact(contactId)` → determines which profile a contact sees
- **Templates**: HTML `<template>` tags for profiles and contacts list

---



> Hi,  
> I’m a 3rd-year CS student and I built a small prototype demonstrating multi-profile personas for WhatsApp. It shows per-contact visibility, profile preview, and privacy-focused UX.   
> I’d love to discuss internship opportunities where I can contribute to messaging app products.  
> Thank you!  
> Ekaspreet Kaur


