// js/ui.js
import {
  clone
} from "./data.js";

// Basic DOM selectors helper
export function $(sel) {
  return document.querySelector(sel);
}
export function $all(sel) {
  return document.querySelectorAll(sel);
}

// --------------------------------------------
// RENDER: PROFILES SIDEBAR LIST
// --------------------------------------------
export function renderProfilesList(profiles, activeId, onSelectProfile, onEdit) {
  const list = $("#profilesList");
  const tmpl = $("#profileItemTmpl");

  list.innerHTML = "";

  profiles.forEach((p) => {
    const node = tmpl.content.firstElementChild.cloneNode(true);

    node.querySelector(".profile-avatar").src = p.avatar;
    node.querySelector(".profile-name").textContent = p.name;

    // visibility text
    if (p.visibility.mode === "everyone") {
      node.querySelector(".profile-vis").textContent = "Everyone";
    } else if (p.visibility.mode === "contacts") {
      node.querySelector(".profile-vis").textContent = "My contacts";
    } else if (p.visibility.mode === "custom") {
      node.querySelector(".profile-vis").textContent =
        `${p.visibility.allowed.length} allowed`;
    }

    // highlight active
    if (p.id === activeId) {
      node.classList.add("bg-blue-50");
    }

    // clicking the left side = switch active
    node.addEventListener("click", (e) => {
      if (!e.target.classList.contains("profile-actions")) {
        onSelectProfile(p.id);
      }
    });

    // clicking Edit
    node.querySelector(".profile-actions").addEventListener("click", (e) => {
      e.stopPropagation();
      onEdit(p.id);
    });

    list.appendChild(node);
  });
}

// --------------------------------------------
// RENDER: CONTACTS SIDEBAR LIST
// --------------------------------------------
export function renderContactsList(contacts, onSelect) {
  const list = $("#contactsList");
  const tmpl = $("#contactItemTmpl");

  list.innerHTML = "";

  contacts.forEach((c) => {
    const node = tmpl.content.firstElementChild.cloneNode(true);
    node.querySelector(".contact-avatar").src = c.avatar;
    node.querySelector(".contact-name").textContent = c.name;
    node.querySelector(".contact-last").textContent = c.lastMessage;
    node.querySelector(".contact-lastseen").textContent = c.lastSeen;

    node.addEventListener("click", () => onSelect(c.id));

    list.appendChild(node);
  });
}

// --------------------------------------------
// RENDER MAIN TOP BAR (current profile)
// --------------------------------------------
export function renderActiveProfileHeader(profile) {
  $("#currentProfileAvatar").src = profile.avatar;
  $("#currentProfileName").textContent = profile.name;
  $("#currentProfileAbout").textContent = profile.about;

  $("#mobileProfileAvatar").src = profile.avatar;
  $("#mobileProfileName").textContent = profile.name;
  $("#mobileProfileAbout").textContent = profile.about;
}

// --------------------------------------------
// PROFILE EDITOR VIEW
// --------------------------------------------
export function showProfileEditor(
  profile,
  contacts,
  onSave,
  onCancel,
  onDelete,
  onPreview
) {
  $("#welcomeView").classList.add("hidden");
  $("#viewsContainer").classList.remove("hidden");
  $("#chatView").classList.add("hidden");

  const container = $("#profileEditor");
  container.classList.remove("hidden");
  container.innerHTML = "";

  const root = document.createElement("div");
  root.className = "max-w-2xl mx-auto bg-white shadow rounded p-6";

  root.innerHTML = `
    <h2 class="text-xl font-semibold mb-4">Edit Profile</h2>

    <div class="flex items-center gap-4 mb-6">
      <div>
        <img id="peAvatar" src="${profile.avatar}" class="w-20 h-20 rounded-full object-cover"/>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Change Avatar</label>
        <input id="peAvatarInput" type="file" accept="image/*" class="text-sm"/>
      </div>
    </div>

    <label class="block font-medium mb-1">Profile Name</label>
    <input id="peName" class="w-full border rounded px-3 py-2 mb-4" value="${profile.name}"/>

    <label class="block font-medium mb-1">About</label>
    <input id="peAbout" class="w-full border rounded px-3 py-2 mb-4" value="${profile.about}"/>

    <label class="block font-medium mb-2">Visibility</label>
    <select id="peVisibility" class="border rounded px-3 py-2 mb-4 w-full">
      <option value="everyone" ${profile.visibility.mode === "everyone" ? "selected" : ""}>Everyone</option>
      <option value="contacts" ${profile.visibility.mode === "contacts" ? "selected" : ""}>My contacts</option>
      <option value="custom" ${profile.visibility.mode === "custom" ? "selected" : ""}>Custom (Allowed only)</option>
    </select>

    <div id="customVisibilitySection" class="${profile.visibility.mode === "custom" ? "" : "hidden"} mb-4">
      <h3 class="font-medium mb-2 text-sm">Allow specific contacts</h3>
      <div class="space-y-2">
        ${contacts
          .map(
            (c) => `
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" class="peAllowContact" value="${c.id}"
              ${profile.visibility.allowed.includes(c.id) ? "checked" : ""}/>
            ${c.name}
          </label>
        `
          )
          .join("")}
      </div>
    </div>

    <div class="flex justify-between mt-6">
      <button id="peDelete" class="px-3 py-2 bg-red-600 text-white rounded">Delete</button>
      <div class="flex gap-3">
        <button id="pePreview" class="px-3 py-2 bg-gray-200 rounded">Preview as…</button>
        <button id="peCancel" class="px-3 py-2 bg-gray-100 rounded">Cancel</button>
        <button id="peSave" class="px-3 py-2 bg-blue-600 text-white rounded">Save</button>
      </div>
    </div>
  `;

  container.appendChild(root);

  // Avatar file upload
  $("#peAvatarInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      $("#peAvatar").src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  // Show/hide custom visibility
  $("#peVisibility").addEventListener("change", (e) => {
    if (e.target.value === "custom") {
      $("#customVisibilitySection").classList.remove("hidden");
    } else {
      $("#customVisibilitySection").classList.add("hidden");
    }
  });

  // Cancel
  $("#peCancel").addEventListener("click", () => onCancel());

  // Delete
  $("#peDelete").addEventListener("click", () => onDelete(profile.id));

  // Preview
  $("#pePreview").addEventListener("click", () => onPreview(profile));

  // Save
  $("#peSave").addEventListener("click", () => {
    const updated = clone(profile);
    updated.name = $("#peName").value;
    updated.about = $("#peAbout").value;
    updated.visibility.mode = $("#peVisibility").value;

    if (updated.visibility.mode === "custom") {
      updated.visibility.allowed = Array.from(
        document.querySelectorAll(".peAllowContact:checked")
      ).map((x) => x.value);
    } else {
      updated.visibility.allowed = [];
    }

    // avatar
    updated.avatar = $("#peAvatar").src;

    onSave(updated);
  });
}

// --------------------------------------------
// CHAT VIEW (preview contact → what they see)
// --------------------------------------------
export function showChatView(contact, profileUsed, onBack) {
  $("#welcomeView").classList.add("hidden");
  $("#viewsContainer").classList.remove("hidden");
  $("#profileEditor").classList.add("hidden");

  const container = $("#chatView");
  container.classList.remove("hidden");
  container.innerHTML = "";

  const root = document.createElement("div");
  root.className = "max-w-3xl mx-auto bg-white shadow rounded p-6";

  root.innerHTML = `
    <button id="cvBack" class="text-sm mb-4 px-3 py-1 bg-gray-100 rounded">&larr; Back</button>

    <div class="flex items-center gap-4 mb-6">
      <img src="${profileUsed.avatar}" class="w-16 h-16 rounded-full object-cover"/>
      <div>
        <h2 class="text-xl font-semibold">${profileUsed.name}</h2>
        <p class="text-sm text-gray-600">${profileUsed.about}</p>
      </div>
      <div class="ml-auto text-right">
        <div class="text-xs text-gray-500">Contact: ${contact.name}</div>
        <div class="text-xs text-gray-400">Last seen: ${contact.lastSeen}</div>
      </div>
    </div>

    <p class="text-sm text-gray-500">This is how <strong>${contact.name}</strong> sees your profile.</p>
  `;

  container.appendChild(root);

  $("#cvBack").addEventListener("click", () => onBack());
}

// --------------------------------------------
// SWITCH TO WELCOME SCREEN
// --------------------------------------------
export function showWelcome() {
  $("#viewsContainer").classList.add("hidden");
  $("#welcomeView").classList.remove("hidden");
  $("#profileEditor").classList.add("hidden");
  $("#chatView").classList.add("hidden");
}
