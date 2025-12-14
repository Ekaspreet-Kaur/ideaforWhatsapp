// js/app.js
import {
  defaultContacts,
  defaultProfile,
  createProfile,
  clone
} from "./data.js";

import {
  loadProfiles,
  loadContacts,
  loadActiveProfileId,
  saveProfiles,
  saveContacts,
  saveActiveProfileId
} from "./storage.js";

import {
  renderProfilesList,
  renderContactsList,
  renderActiveProfileHeader,
  showProfileEditor,
  showChatView,
  showWelcome
} from "./ui.js";

// ---------------------------------------------
// APP STATE
// ---------------------------------------------
let profiles = loadProfiles();
let contacts = loadContacts();
let activeProfileId = loadActiveProfileId();

// ---------------------------------------------
// UTILITY: GET PROFILE FOR CONTACT
// ---------------------------------------------
export function getProfileForContact(contactId) {
  // Priority: most specific custom profile -> others -> default
  for (let i = profiles.length - 1; i >= 0; i--) {
    const p = profiles[i];
    if (p.visibility.mode === "everyone") return p;
    if (p.visibility.mode === "contacts") return p; // simplified for demo
    if (
      p.visibility.mode === "custom" &&
      p.visibility.allowed.includes(contactId)
    ) {
      return p;
    }
  }
  // fallback
  return profiles.find((p) => p.id === activeProfileId) || defaultProfile;
}

// ---------------------------------------------
// RENDER ALL SIDEBAR AND HEADER
// ---------------------------------------------
function renderUI() {
  const activeProfile = profiles.find((p) => p.id === activeProfileId) || defaultProfile;
  renderProfilesList(profiles, activeProfileId, switchActiveProfile, openEditProfile);
  renderContactsList(contacts, openChatForContact);
  renderActiveProfileHeader(activeProfile);
}

// ---------------------------------------------
// PROFILE ACTIONS
// ---------------------------------------------
function switchActiveProfile(id) {
  activeProfileId = id;
  saveActiveProfileId(activeProfileId);
  renderUI();
}

function openEditProfile(id) {
  const profile = profiles.find((p) => p.id === id);
  showProfileEditor(
    profile,
    contacts,
    (updatedProfile) => {
      // SAVE
      const idx = profiles.findIndex((p) => p.id === updatedProfile.id);
      if (idx > -1) profiles[idx] = updatedProfile;
      saveProfiles(profiles);
      renderUI();
      showWelcome();
    },
    () => showWelcome(),
    (deleteId) => {
      if (profiles.length === 1) {
        alert("Cannot delete the last profile");
        return;
      }
      profiles = profiles.filter((p) => p.id !== deleteId);
      if (activeProfileId === deleteId) activeProfileId = profiles[0].id;
      saveProfiles(profiles);
      saveActiveProfileId(activeProfileId);
      renderUI();
      showWelcome();
    },
    (profileToPreview) => {
      // Prompt: pick contact to preview
      const contactName = prompt("Enter contact name to preview profile as:");
      if (!contactName) return;
      const contact = contacts.find((c) => c.name.toLowerCase() === contactName.toLowerCase());
      if (!contact) return alert("Contact not found");
      const profileForContact = getProfileForContact(contact.id);
      showChatView(contact, profileForContact, () => showProfileEditor(profileToPreview, contacts, openEditProfile, showWelcome, ()=>{}, ()=>{}));
    }
  );
}

// ---------------------------------------------
// CONTACT ACTIONS
// ---------------------------------------------
function openChatForContact(contactId) {
  const contact = contacts.find((c) => c.id === contactId);
  if (!contact) return;
  const profileUsed = getProfileForContact(contact.id);
  showChatView(contact, profileUsed, () => showWelcome());
}

// ---------------------------------------------
// CREATE NEW PROFILE
// ---------------------------------------------
function createNewProfile() {
  const name = prompt("Enter profile name (e.g., Work, Friends):");
  if (!name) return;
  const newProfile = createProfile({ name, about: "", avatar: "../assets/default-avatar-1.png" });
  profiles.push(newProfile);
  activeProfileId = newProfile.id;
  saveProfiles(profiles);
  saveActiveProfileId(activeProfileId);
  renderUI();
  openEditProfile(newProfile.id);
}

// ---------------------------------------------
// QUICK CREATE FOR DEMO
// ---------------------------------------------
function quickCreateDemoProfile(name) {
  const profile = createProfile({ name, about: `${name} profile`, avatar: "../assets/default-avatar-1.png" });
  if (name === "Work") profile.visibility.mode = "custom";
  profiles.push(profile);
  saveProfiles(profiles);
  renderUI();
}

// ---------------------------------------------
// EVENT LISTENERS
// ---------------------------------------------
document.getElementById("createProfileBtn").addEventListener("click", createNewProfile);
document.getElementById("mobileCreateProfileBtn").addEventListener("click", createNewProfile);
document.getElementById("quickCreateWork").addEventListener("click", () => quickCreateDemoProfile("Work"));
document.getElementById("quickCreateFriends").addEventListener("click", () => quickCreateDemoProfile("Friends"));
document.getElementById("demoScriptBtn").addEventListener("click", () => {
  const ds = document.getElementById("demoScript");
  ds.classList.toggle("hidden");
});

// ---------------------------------------------
// INITIALIZE
// ---------------------------------------------
renderUI();
