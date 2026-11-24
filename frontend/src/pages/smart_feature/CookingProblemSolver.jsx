
import React, { useState } from "react";
import "./CookingProblemSolver.css";

const problems = [
  { id: "salty", icon: "🧂", title: "Too Salty" },
  { id: "watery", icon: "💧", title: "Too Watery" },
  { id: "burnt", icon: "🔥", title: "Burnt Food" },
  { id: "texture", icon: "🥣", title: "Texture Problem" },
  { id: "undercooked", icon: "🍳", title: "Undercooked" },
  { id: "taste", icon: "😕", title: "Taste Problem" },
];

const demoSolutions = {
  salty: {
    problem: "Your dish may contain too much salt.",
    recommendations: [
      "Add a little more unsalted mixture to balance the salt.",
      "Add suitable vegetables or other unsalted ingredients.",
      "Mix thoroughly and taste again.",
      "Avoid adding more salt during the remaining cooking process.",
    ],
    tip: "Add ingredients gradually and taste before making further adjustments.",
  },
  watery: {
    problem: "Your rice mixture is too watery.",
    recommendations: [
      "Drain excess liquid if possible.",
      "Add a small amount of breadcrumbs.",
      "Mix thoroughly and check the consistency.",
      "Chill the mixture briefly before shaping.",
    ],
    tip: "Add breadcrumbs gradually. Too much can make the cutlets dry.",
  },
  burnt: {
    problem: "Your food may have been overcooked or burnt.",
    recommendations: [
      "Immediately remove the pan from the heat.",
      "Transfer unaffected food to another clean container.",
      "Avoid scraping burnt portions into the remaining food.",
      "Check the taste and discard food if it is heavily burnt.",
    ],
    tip: "Use medium heat and monitor cooking time carefully.",
  },
  texture: {
    problem: "Your mixture may not have the correct consistency.",
    recommendations: [
      "Check whether the mixture is too dry or too soft.",
      "Add a small amount of suitable binding ingredient.",
      "Mix everything evenly.",
      "Test one small cutlet before shaping the rest.",
    ],
    tip: "A consistent mixture helps cutlets maintain their shape.",
  },
  undercooked: {
    problem: "Your food may need additional cooking.",
    recommendations: [
      "Check the centre of the food.",
      "Continue cooking at an appropriate heat.",
      "Turn the cutlets evenly on both sides.",
      "Verify that the food has reached a safe internal temperature where applicable.",
    ],
    tip: "Do not rely on the outside colour alone to judge whether food is cooked.",
  },
  taste: {
    problem: "Your dish may need flavour balancing.",
    recommendations: [
      "Taste a small portion first.",
      "Identify whether salt, spice or seasoning is missing.",
      "Add seasoning in small quantities.",
      "Mix well and taste again before serving.",
    ],
    tip: "Make small adjustments rather than adding multiple seasonings at once.",
  },
};

function CookingProblemSolver() {
  const [selectedProblem, setSelectedProblem] = useState("");
  const [description, setDescription] = useState("");
  const [foodImage, setFoodImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload JPG, PNG or WEBP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be below 5 MB.");
      return;
    }

    setFoodImage(file);
    setImagePreview(URL.createObjectURL(file));
    setSolution(null);
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setFoodImage(null);
    setImagePreview("");
  };

  const analyzeProblem = async () => {
    if (!selectedProblem) {
      alert("Please select a cooking problem.");
      return;
    }

    if (!description.trim()) {
      alert("Please describe your cooking problem.");
      return;
    }

    setLoading(true);
    setSolution(null);

    try {
      // Demo mode: replace with Django + Gemini API integration.
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSolution(demoSolutions[selectedProblem]);
    } catch (error) {
      console.error(error);
      alert("Unable to analyze the cooking problem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cps-page">

      {/* Header */}
      <header className="cps-header">
        <div className="cps-brand">
          <span className="cps-logo">🌿</span>
          <div>
            <h2>ZERO-WASTE KITCHEN AI</h2>
            <p>Smart Cooking</p>
          </div>
        </div>

        <span className="cps-ai-badge">
          ✨ Gemini AI
        </span>
      </header>

      {/* Page Title */}
      <section className="cps-title">
        <span className="cps-eyebrow">SMART COOKING SUPPORT</span>
        <h1>AI Cooking Problem Solver</h1>
        <p>
          Describe your cooking problem and get AI-guided suggestions
          to improve your dish.
        </p>
      </section>

      {/* Current Recipe */}
      <section className="cps-card cps-recipe-card">
        <div>
          <span className="cps-label">CURRENT RECIPE</span>
          <h2>Leftover Rice Vegetable Cutlet</h2>
        </div>

        <div className="cps-recipe-status">
          <span className="cps-status-dot"></span>
          Cooking status: Step 02 — Mixing
        </div>
      </section>

      {/* Select Problem */}
      <section className="cps-card">
        <div className="cps-section-heading">
          <div>
            <span className="cps-label">01. SELECT YOUR COOKING PROBLEM</span>
            <h2>What's going wrong?</h2>
          </div>
          <span className="cps-section-icon">⚠️</span>
        </div>

        <div className="cps-problem-grid">
          {problems.map((problem) => (
            <button
              key={problem.id}
              className={`cps-problem-option ${
                selectedProblem === problem.id ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedProblem(problem.id);
                setSolution(null);
              }}
            >
              <span className="cps-problem-icon">
                {problem.icon}
              </span>

              <strong>{problem.title}</strong>

              <span className="cps-select-text">
                {selectedProblem === problem.id
                  ? "✓ Selected"
                  : "Select problem"}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Describe Problem */}
      <section className="cps-card">
        <div className="cps-section-heading">
          <div>
            <span className="cps-label">02. DESCRIBE YOUR PROBLEM</span>
            <h2>What went wrong while cooking?</h2>
          </div>
          <span className="cps-section-icon">📝</span>
        </div>

        <textarea
          className="cps-description"
          placeholder="Example: My rice mixture is too watery and the cutlets are not holding their shape."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setSolution(null);
          }}
          rows={5}
        />

        <div className="cps-character-count">
          {description.length} characters
        </div>
      </section>

      {/* Image Upload */}
      <section className="cps-card">
        <div className="cps-section-heading">
          <div>
            <span className="cps-label">03. UPLOAD FOOD IMAGE (OPTIONAL)</span>
            <h2>Upload a food photo</h2>
          </div>
          <span className="cps-section-icon">📸</span>
        </div>

        <label className="cps-upload-area">
          {imagePreview ? (
            <div className="cps-image-preview">
              <img src={imagePreview} alt="Uploaded food preview" />
              <span>Change image</span>
            </div>
          ) : (
            <>
              <span className="cps-upload-icon">☁️</span>
              <strong>Click to upload food image</strong>
              <span>JPG, PNG or WEBP · Maximum 5 MB</span>
            </>
          )}

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageUpload}
          />
        </label>

        {foodImage && (
          <div className="cps-uploaded-file">
            <span>📎 {foodImage.name}</span>
            <button onClick={removeImage}>Remove</button>
          </div>
        )}
      </section>

      {/* Analyze Button */}
      <button
        className="cps-analyze-button"
        onClick={analyzeProblem}
        disabled={loading}
      >
        {loading ? "Analyzing Problem..." : "✨ Analyze Cooking Problem →"}
      </button>

      {/* AI Solution */}
      <section className="cps-card cps-solution-card">
        <div className="cps-section-heading">
          <div>
            <span className="cps-label">04. AI SOLUTION</span>
            <h2>Suggested Solution</h2>
          </div>
          <span className="cps-solution-icon">🤖</span>
        </div>

        {!solution ? (
          <div className="cps-empty-solution">
            <span>💡</span>
            <h3>Your AI solution will appear here</h3>
            <p>
              Select a cooking problem and describe it to receive
              suggested recommendations.
            </p>
          </div>
        ) : (
          <>
            <div className="cps-problem-summary">
              <span>IDENTIFIED PROBLEM</span>
              <h3>
                {problems.find((p) => p.id === selectedProblem)?.title}
              </h3>
              <p>{solution.problem}</p>
            </div>

            <div className="cps-recommendations">
              <h3>✨ AI Recommendations</h3>

              {solution.recommendations.map((item, index) => (
                <div className="cps-recommendation" key={index}>
                  <span>{index + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="cps-tip-box">
              <span>💡</span>
              <div>
                <strong>AI Cooking Tip</strong>
                <p>{solution.tip}</p>
              </div>
            </div>

            <div className="cps-disclaimer">
              AI suggestions are informational and do not guarantee
              that every cooking problem can be fixed.
              Always follow appropriate food safety practices.
            </div>
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="cps-footer">
        <strong>
          <span className="cps-status-dot"></span>
          AI Cooking Support
        </strong>

        <p>
          UI preview. Real AI analysis and image understanding
          require Django and Gemini API integration.
        </p>
      </footer>

    </div>
  );
}

export default CookingProblemSolver;
