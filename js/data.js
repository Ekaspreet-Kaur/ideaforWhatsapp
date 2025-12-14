// js/data.js

// ------------------------------
// DEFAULT DATA
// ------------------------------

// Default contacts (demo)
export const defaultContacts = [
  {
    id: "c1",
    name: "Boss",
    avatar: "../assets/default-avatar-2.png",
    lastMessage: "Please send the report.",
    lastSeen: "Online",
  },
  {
    id: "c2",
    name: "Best Friend",
    avatar: "../assets/default-avatar-2.png",
    lastMessage: "Brooo where are you??",
    lastSeen: "5m ago",
  },
  {
    id: "c3",
    name: "Mom",
    avatar: "../assets/default-avatar-2.png",
    lastMessage: "Beta khana kha liya?",
    lastSeen: "10m ago",
  },
  {
    id: "c4",
    name: "Client - A",
    avatar: "../assets/default-avatar-2.png",
    lastMessage: "Meeting tomorrow?",
    lastSeen: "1h ago",
  }
];

// Default profile — always available initially
export const defaultProfile = {
  id: "p1",
  name: "Default Profile",
  about: "Available",
  avatar: "../assets/default-avatar-1.png",
  visibility: {
    mode: "everyone",  
    allowed: [],        
    blocked: []         
  },
};

// ------------------------------
// HELPERS
// ------------------------------

// Creates a new profile object
export function createProfile({ name, about, avatar }) {
  return {
    id: "p" + Math.random().toString(36).substring(2, 9),
    name,
    about,
    avatar,
    visibility: {
      mode: "everyone",
      allowed: [],
      blocked: []
    }
  };
}

// Shallow clone (useful for editing)
export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
