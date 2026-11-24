
import React, { useState } from "react";
import "./FoodSafetyAssistant.css";

function FoodSafetyAssistant() {
  const [foodName, setFoodName] = useState("Cooked Rice");
  const [foodType, setFoodType] = useState("Cooked Food");
  const [cookedDate, setCookedDate] = useState("2026-11-24");
  const [storage, setStorage] = useState("Refrigerator");
  const [temperature, setTemperature] = useState("4°C or below");
  const [condition, setCondition] = useState("No visible mould");
  const [foodImage, setFoodImage] = useState(null);
  const [result, setResult] = useState(false);
  const [error, setError] = useState("");

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please upload a JPG, PNG or WEBP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be below 5MB.");
      return;
    }

    setError("");
    setFoodImage(file);
  };

  const checkSafety = () => {
    if (!foodName.trim()) {
      setError("Please enter a food name.");
      return;
    }

    setError("");
    setResult(true);
  };

  return (
    <div className="safety-page">
      <header className="safety-header">
        <div className="safety-brand">
          <span className="safety-logo">🌿</span>
          <div>
            <h2>SMART CHEF</h2>
            <p>Smart Kitchen • Less Waste</p>
          </div>
        </div>

        <span className="safety-ai-badge">✦ Gemini AI</span>
      </header>

      <main className="safety-container">
        <section className="safety-heading">
          <span className="safety-label">SMART KITCHEN FEATURE</span>
          <h1>AI Food Safety Assistant</h1>
          <p>
            Get food storage, freshness and safety guidance before using
            leftover ingredients.
          </p>
        </section>

        <section className="safety-form-card">
          <div className="safety-card-heading">
            <span className="safety-icon">🛡️</span>
            <div>
              <h2>Check Your Leftover Food</h2>
              <p>Enter food details to receive safety guidance.</p>
            </div>
          </div>

          <div className="safety-section-title">
            <span>01.</span>
            <h3>Food Information</h3>
          </div>

          <div className="safety-form-grid">
            <div className="safety-field">
              <label>Food Name</label>
              <input
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="e.g. Cooked Rice"
              />
            </div>

            <div className="safety-field">
              <label>Food Type</label>
              <select
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
              >
                <option>Cooked Food</option>
                <option>Raw Vegetables</option>
                <option>Cooked Vegetables</option>
                <option>Dairy Products</option>
                <option>Fruits</option>
                <option>Meat and Fish</option>
                <option>Other</option>
              </select>
            </div>

            <div className="safety-field">
              <label>When was it cooked?</label>
              <input
                type="date"
                value={cookedDate}
                onChange={(e) => setCookedDate(e.target.value)}
                max="2026-11-24"
              />
            </div>

            <div className="safety-field">
              <label>Storage Method</label>
              <select
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
              >
                <option>Refrigerator</option>
                <option>Room Temperature</option>
                <option>Freezer</option>
                <option>Other</option>
              </select>
            </div>

            <div className="safety-field full-width">
              <label>Storage Temperature</label>
              <select
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
              >
                <option>4°C or below</option>
                <option>5°C – 10°C</option>
                <option>Above 10°C</option>
                <option>Unknown</option>
              </select>
            </div>
          </div>

          <div className="safety-divider" />

          <div className="safety-section-title">
            <span>02.</span>
            <h3>Food Condition</h3>
          </div>

          <div className="safety-field">
            <label>Visible condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option>No visible mould</option>
              <option>Visible mould</option>
              <option>Unusual colour</option>
              <option>Unusual texture</option>
              <option>Unknown</option>
            </select>
          </div>

          <div className="safety-field upload-field">
            <label>Upload food image (optional)</label>
            <div className="safety-upload-box">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImage}
              />
              <span>📷</span>
              <strong>{foodImage ? foodImage.name : "Choose Food Image"}</strong>
              <small>JPG, PNG or WEBP · Maximum 5MB</small>
            </div>
            {foodImage && (
              <button
                type="button"
                className="remove-image"
                onClick={() => setFoodImage(null)}
              >
                Remove image
              </button>
            )}
          </div>

          <p className="appearance-warning">
            ⚠ Appearance and smell alone cannot establish that food is safe.
          </p>

          {error && <p className="safety-error">{error}</p>}

          <button className="safety-check-button" onClick={checkSafety}>
            Check Food Safety →
          </button>
        </section>

        {result && (
          <section className="safety-results">
            <div className="safety-section-title">
              <span>03.</span>
              <h3>AI Safety Analysis</h3>
            </div>

            <div className="safety-result-card">
              <div className="result-heading">
                <span>🛡️</span>
                <div>
                  <h3>Safety Guidance</h3>
                  <p>Example only · Demo response</p>
                </div>
              </div>

              <h4>Important checks</h4>
              <ul>
                <li>Was the rice refrigerated within 1 hour of cooking?</li>
                <li>Was it kept continuously cold?</li>
                <li>How long has it been stored?</li>
              </ul>

              <div className="recommendation-box">
                <strong>AI Recommendation</strong>
                <p>
                  Do not use cooked rice if its storage history is uncertain.
                  Reheating does not reliably remove toxins that may have
                  formed during improper storage.
                </p>
              </div>

              <p className="result-demo-note">
                This is a static example, not an assessment of your submitted
                food details or image.
              </p>
            </div>
          </section>
        )}

        <section className="safety-guidelines">
          <div className="safety-section-title">
            <span>04.</span>
            <h3>Food Safety Guidelines</h3>
          </div>

          <div className="guideline-grid">
            <div className="guideline-card">
              <span>🌡️</span>
              <h3>Temperature Control</h3>
              <p>Keep refrigerated food at 4°C or below.</p>
            </div>

            <div className="guideline-card">
              <span>⏱️</span>
              <h3>Storage Time</h3>
              <p>
                Refrigerate cooked food promptly. Follow food-specific storage
                guidance.
              </p>
            </div>

            <div className="guideline-card warning-guideline">
              <span>⚠️</span>
              <h3>Safety Warning</h3>
              <p>When in doubt, throw it out.</p>
            </div>
          </div>
        </section>

        <div className="safety-disclaimer">
          <strong>Important:</strong> এটি UI layout preview। Gemini AI food
          safety সম্পর্কে guidance দিতে পারে, কিন্তু কোনো খাবার নিরাপদ কিনা
          তা নিশ্চিতভাবে certify করতে পারে না।
        </div>
      </main>
    </div>
  );
}

export default FoodSafetyAssistant;
