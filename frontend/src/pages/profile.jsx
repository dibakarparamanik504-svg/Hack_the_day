
import { useEffect, useState } from "react";
import "./profile.css";

const defaultProfile = {
  name: "Active User",
  email: "user@example.com",
  phone: "",
  location: "",
  cuisine: "Bengali",
  dietary: "No restrictions",
  allergies: "",
  cookingStyle: "Quick & Easy",
  servings: "2",
  language: "English",
  notifications: true,
  emailUpdates: false,
};

function Profile() {
  const [profile, setProfile] = useState(defaultProfile);
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("zwk_user_profile");
    if (saved) {
      try {
        setProfile({ ...defaultProfile, ...JSON.parse(saved) });
      } catch {
        localStorage.removeItem("zwk_user_profile");
      }
    }
  }, []);

  const updateField = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const saveProfile = () => {
    localStorage.setItem("zwk_user_profile", JSON.stringify(profile));
    setEditing(false);
    setMessage("Profile preferences saved successfully.");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleLogout = () => {
    // Connect this action to Django authentication logout API.
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      localStorage.removeItem("zwk_auth_token");
      window.location.href = "/login";
    }
  };

  const handleDeleteAccount = () => {
    // This demo cannot delete a real account.
    setShowDelete(false);
    setMessage("Account deletion requires backend authentication.");
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <div className="profile-page">
      {/* Navigation */}
      <nav className="profile-navbar">
        <a href="/" className="profile-brand">
          <span className="brand-icon">🌿</span>
          ZERO-WASTE KITCHEN AI
        </a>

        <div className="profile-nav-links">
          <a href="/">HOME</a>
          <a href="/generate">GENERATE</a>
          <a href="/explore">EXPLORE</a>
          <a href="/saved">SAVED</a>
          <a href="/tracker">TRACKER</a>
          <a href="/profile" className="active">PROFILE</a>
        </div>
      </nav>

      <main className="profile-container">
        {/* Header */}
        <section className="profile-heading">
          <div>
            <span className="profile-eyebrow">YOUR PERSONAL SPACE</span>
            <h1>My Profile</h1>
            <p>Manage your personal account and cooking preferences.</p>
          </div>

          <div className="active-user-badge">
            <span className="online-dot"></span>
            Active User
          </div>
        </section>

        {message && (
          <div className="profile-message">{message}</div>
        )}

        {/* Personal Information */}
        <section className="profile-card">
          <div className="profile-section-heading">
            <div>
              <span className="section-number">01</span>
              <h2>Personal Information</h2>
              <p>Your basic account details.</p>
            </div>

            <button
              className="profile-outline-button"
              onClick={() => editing ? saveProfile() : setEditing(true)}
            >
              {editing ? "Save Changes" : "Update Profile"}
            </button>
          </div>

          <div className="personal-profile">
            <div className="profile-avatar">
              {profile.name.charAt(0).toUpperCase()}
            </div>

            <div className="profile-user-details">
              <h3>{profile.name || "Your Name"}</h3>
              <p>{profile.email}</p>
              <span>Member Account</span>
            </div>
          </div>

          <div className="profile-form-grid">
            <div className="profile-field">
              <label>Full Name</label>
              <input
                value={profile.name}
                disabled={!editing}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="profile-field">
              <label>Email Address</label>
              <input
                type="email"
                value={profile.email}
                disabled={!editing}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="Enter email address"
              />
            </div>

            <div className="profile-field">
              <label>Phone Number</label>
              <input
                value={profile.phone}
                disabled={!editing}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            <div className="profile-field">
              <label>Location</label>
              <input
                value={profile.location}
                disabled={!editing}
                onChange={(e) => updateField("location", e.target.value)}
                placeholder="City, Country"
              />
            </div>
          </div>
        </section>

        {/* Cooking Preferences */}
        <section className="profile-card">
          <div className="profile-section-heading">
            <div>
              <span className="section-number">02</span>
              <h2>Cooking Preferences</h2>
              <p>Customize your default cooking preferences.</p>
            </div>
          </div>

          <div className="profile-form-grid">
            <div className="profile-field">
              <label>Preferred Cuisine</label>
              <select
                value={profile.cuisine}
                onChange={(e) => updateField("cuisine", e.target.value)}
              >
                <option>Bengali</option>
                <option>North Indian</option>
                <option>South Indian</option>
                <option>Chinese-Indian</option>
                <option>Mediterranean</option>
                <option>Mixed Cuisine</option>
              </select>
            </div>

            <div className="profile-field">
              <label>Dietary Restrictions</label>
              <select
                value={profile.dietary}
                onChange={(e) => updateField("dietary", e.target.value)}
              >
                <option>No restrictions</option>
                <option>Vegetarian</option>
                <option>Vegan</option>
                <option>Eggetarian</option>
                <option>Gluten-free</option>
                <option>Dairy-free</option>
              </select>
            </div>

            <div className="profile-field">
              <label>Food Allergies</label>
              <input
                value={profile.allergies}
                onChange={(e) => updateField("allergies", e.target.value)}
                placeholder="e.g. Peanuts, Milk, Soy"
              />
            </div>

            <div className="profile-field">
              <label>Preferred Cooking Style</label>
              <select
                value={profile.cookingStyle}
                onChange={(e) => updateField("cookingStyle", e.target.value)}
              >
                <option>Quick & Easy</option>
                <option>Traditional</option>
                <option>Healthy Cooking</option>
                <option>Low Budget</option>
                <option>Creative Cooking</option>
              </select>
            </div>

            <div className="profile-field">
              <label>Default Serving Size</label>
              <select
                value={profile.servings}
                onChange={(e) => updateField("servings", e.target.value)}
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5 People</option>
                <option value="6">6+ People</option>
              </select>
            </div>
          </div>

          <button className="profile-save-button" onClick={saveProfile}>
            Save Preferences
          </button>
        </section>

        {/* Language Settings */}
        <section className="profile-card">
          <div className="profile-section-heading">
            <div>
              <span className="section-number">03</span>
              <h2>Language Settings</h2>
              <p>Choose your preferred application language.</p>
            </div>
          </div>

          <div className="language-options">
            {["English", "বাংলা (Bengali)", "हिन्दी (Hindi)"].map((lang) => (
              <button
                key={lang}
                className={`language-option ${
                  profile.language === lang ? "selected" : ""
                }`}
                onClick={() => updateField("language", lang)}
              >
                <span>{lang}</span>
                <span className="language-check">
                  {profile.language === lang ? "✓" : ""}
                </span>
              </button>
            ))}
          </div>

          <button className="profile-save-button" onClick={saveProfile}>
            Save Language
          </button>
          <p className="profile-note">
            Language selection is saved as a preference. Full interface
            translation requires multilingual support across the application.
          </p>
        </section>

        {/* Account Settings */}
        <section className="profile-card">
          <div className="profile-section-heading">
            <div>
              <span className="section-number">04</span>
              <h2>Account Settings</h2>
              <p>Manage your account security and notifications.</p>
            </div>
          </div>

          <div className="account-setting-row">
            <div>
              <h3>Change Password</h3>
              <p>Update your account password.</p>
            </div>
            <button
              className="profile-outline-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Close" : "Change"}
            </button>
          </div>

          {showPassword && (
            <div className="password-panel">
              <input type="password" placeholder="Current password" />
              <input type="password" placeholder="New password" />
              <input type="password" placeholder="Confirm new password" />
              <button
                className="profile-save-button"
                onClick={() => {
                  setMessage("Password change requires Django API integration.");
                  setShowPassword(false);
                }}
              >
                Update Password
              </button>
            </div>
          )}

          <div className="account-setting-row">
            <div>
              <h3>Notification Preferences</h3>
              <p>Receive application notifications.</p>
            </div>
            <label className="profile-switch">
              <input
                type="checkbox"
                checked={profile.notifications}
                onChange={(e) => updateField("notifications", e.target.checked)}
              />
              <span></span>
            </label>
          </div>

          <div className="account-setting-row">
            <div>
              <h3>Email Updates</h3>
              <p>Receive updates and announcements by email.</p>
            </div>
            <label className="profile-switch">
              <input
                type="checkbox"
                checked={profile.emailUpdates}
                onChange={(e) => updateField("emailUpdates", e.target.checked)}
              />
              <span></span>
            </label>
          </div>

          <div className="account-setting-row">
            <div>
              <h3>Privacy & Security</h3>
              <p>Your personal information and account protection.</p>
            </div>
            <span className="security-status">Account Settings</span>
          </div>

          <div className="account-setting-row danger-row">
            <div>
              <h3>Delete Account</h3>
              <p>Permanently remove your account and associated data.</p>
            </div>
            <button
              className="delete-button"
              onClick={() => setShowDelete(true)}
            >
              Delete Account
            </button>
          </div>
        </section>

        {/* Session */}
        <section className="profile-card session-card">
          <div>
            <span className="section-number">05</span>
            <h2>Session</h2>
            <p>Sign out of your current session.</p>
          </div>

          <button className="logout-button" onClick={handleLogout}>
            ↪ &nbsp; Log Out
          </button>
        </section>

        {/* Footer */}
        <footer className="profile-footer">
          <h3>🌿 ZERO-WASTE KITCHEN AI</h3>
          <p>Your account. Your preferences. Your kitchen.</p>
          <span>© {new Date().getFullYear()} Zero-Waste Kitchen AI</span>
        </footer>
      </main>

      {/* Delete Confirmation */}
      {showDelete && (
        <div className="profile-modal-overlay">
          <div className="profile-modal">
            <h2>Delete Account?</h2>
            <p>
              This action should permanently delete your account and related
              data. Continue only if you are sure.
            </p>
            <div className="profile-modal-actions">
              <button
                className="profile-outline-button"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>
              <button
                className="delete-button"
                onClick={handleDeleteAccount}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
