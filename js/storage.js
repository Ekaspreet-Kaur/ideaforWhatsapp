// js/storage.js
import { defaultContacts, defaultProfile } from "./data.js";

// -----------------------------------------
// CONSTANT KEYS
// -----------------------------------------
const LS_KEY_PROFILES = "mp_profiles";
const LS_KEY_ACTIVE = "mp_active_profile";
const LS_KEY_CONTACTS = "mp_contacts";

// -----------------------------------------
// LOADERS
// -----------------------------------------

export function loadContacts() {
  let saved = localStorage.getItem(LS_KEY_CONTACTS);
  if (!saved) {
    localStorage.setItem(LS_KEY_CONTACTS, JSON.stringify(defaultContacts));
    return defaultContacts;
  }
  return JSON.parse(saved);
}

export function loadProfiles() {
  let saved = localStorage.getItem(LS_KEY_PROFILES);
  if (!saved) {
    const initial = [defaultProfile];
    localStorage.setItem(LS_KEY_PROFILES, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(saved);
}

export function loadActiveProfileId() {
  let saved = localStorage.getItem(LS_KEY_ACTIVE);
  if (!saved) {
    localStorage.setItem(LS_KEY_ACTIVE, defaultProfile.id);
    return defaultProfile.id;
  }
  return saved;
}

// -----------------------------------------
// SAVERS
// -----------------------------------------

export function saveContacts(list) {
  localStorage.setItem(LS_KEY_CONTACTS, JSON.stringify(list));
}

export function saveProfiles(list) {
  localStorage.setItem(LS_KEY_PROFILES, JSON.stringify(list));
}

export function saveActiveProfileId(id) {
  localStorage.setItem(LS_KEY_ACTIVE, id);
}
