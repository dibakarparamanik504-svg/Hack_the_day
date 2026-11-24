
import React, { useState } from "react";
import "./smartCookingGuide.css";

const ingredients = [
  "1 cup leftover rice",
  "1/2 cup chopped vegetables",
  "2 tablespoons breadcrumbs",
  "1 boiled potato",
  "Salt and spices",
];

const cookingSteps = [
  {
    title: "PREPARATION",
    heading: "Prepare all ingredients",
    description:
      "Collect your leftover rice, chopped vegetables, boiled potato, breadcrumbs and spices. Make sure everything is ready before cooking.",
    tip: "Use refrigerated leftover rice for a better cutlet texture.",
    time: "5 minutes",
  },
  {
    title: "MIXING",
    heading: "Mix all ingredients",
    description:
      "Combine leftover rice, boiled potato, chopped vegetables, breadcrumbs and spices in a mixing bowl. Mix until the texture holds together.",
    tip: "If the mixture feels too wet, add breadcrumbs gradually.",
    time: "5 minutes",
  },
  {
    title: "SHAPING",
    heading: "Shape the cutlets",
    description:
      "Take small portions of the mixture and shape them into round or oval cutlets. Press gently to make them firm.",
    tip: "Apply a little oil to your hands to prevent sticking.",
    time: "5 minutes",
  },
  {
    title: "COOKING",
    heading: "Cook until golden brown",
    description:
      "Heat a little oil in a pan. Place the cutlets carefully and cook both sides until golden brown and crispy.",
    tip: "Keep the flame on medium heat for even cooking.",
    time: "7 minutes",
  },
  {
    title: "SERVING",
    heading: "Serve your cutlets",
    description:
      "Remove the cutlets from the pan. Allow them to cool slightly and serve with your favourite chutney or sauce.",
    tip: "Serve immediately to enjoy the crispy texture.",
    time: "3 minutes",
  },
];

function SmartCookingGuide() {
  const [currentStep, setCurrentStep] = useState(1);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [question, setQuestion] = useState("");

  const step = cookingSteps[currentStep];
  const progress = ((currentStep + 1) / cookingSteps.length) * 100;

  const toggleIngredient = (index) => {
    setCheckedIngredients((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const handleNext = () => {
    if (currentStep < cookingSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const askAI = () => {
    if (!question.trim()) return;

    // TODO: Connect this function to your Django Gemini API.
    alert("Gemini AI API will be connected soon: " + question);
    setQuestion("");
  };

  return (
    <div className="scg-page">

      {/* Header */}
      <header className="scg-header">
        <div className="scg-brand">
          <span className="scg-logo">🌿</span>
          <div>
            <h2>SMART CHEF</h2>
            <p>Smart Cooking</p>
          </div>
        </div>

        <span className="scg-header-badge">
          <span className="scg-live-dot"></span>
          Cooking Mode
        </span>
      </header>

      {/* Page Title */}
      <section className="scg-title-section">
        <span className="scg-eyebrow">YOUR AI COOKING COMPANION</span>
        <h1>AI Smart Cooking Guide</h1>
        <p>Your personal step-by-step cooking companion</p>
      </section>

      {/* Recipe Information */}
      <section className="scg-card scg-recipe-card">
        <div className="scg-section-heading">
          <div>
            <span className="scg-small-label">RECIPE INFORMATION</span>
            <h2>Leftover Rice Vegetable Cutlet</h2>
          </div>
          <span className="scg-recipe-icon">🍽️</span>
        </div>

        <div className="scg-recipe-stats">
          <div className="scg-stat">
            <span>⏱️</span>
            <div>
              <small>Cooking Time</small>
              <strong>25 min</strong>
            </div>
          </div>

          <div className="scg-stat">
            <span>👥</span>
            <div>
              <small>Servings</small>
              <strong>2 people</strong>
            </div>
          </div>

          <div className="scg-stat">
            <span>⭐</span>
            <div>
              <small>Difficulty</small>
              <strong>Easy</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Cooking Preparation */}
      <section className="scg-card">
        <div className="scg-section-heading">
          <div>
            <span className="scg-small-label">COOKING PREPARATION</span>
            <h2>Cooking Progress</h2>
          </div>
          <strong className="scg-step-count">
            {currentStep + 1} / 5 Steps
          </strong>
        </div>

        <div className="scg-progress-track">
          <div
            className="scg-progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="scg-progress-labels">
          <span>Start Cooking</span>
          <span>{Math.round(progress)}% Completed</span>
        </div>
      </section>

      {/* Main Layout */}
      <div className="scg-main-grid">

        {/* Ingredients */}
        <section className="scg-card scg-ingredients">
          <div className="scg-section-heading">
            <div>
              <span className="scg-small-label">PREPARATION</span>
              <h2>Ingredients Checklist</h2>
            </div>
            <span className="scg-count">
              {checkedIngredients.length}/{ingredients.length}
            </span>
          </div>

          <div className="scg-ingredient-list">
            {ingredients.map((ingredient, index) => (
              <label
                key={index}
                className={`scg-ingredient ${
                  checkedIngredients.includes(index) ? "checked" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={checkedIngredients.includes(index)}
                  onChange={() => toggleIngredient(index)}
                />
                <span className="scg-custom-check"></span>
                <span>{ingredient}</span>
              </label>
            ))}
          </div>

          <div className="scg-ingredient-footer">
            <span>✓</span>
            Check ingredients as you prepare them.
          </div>
        </section>

        {/* Current Cooking Step */}
        <section className="scg-card scg-current-step">
          <div className="scg-step-top">
            <span className="scg-small-label">CURRENT COOKING STEP</span>
            <span className="scg-step-number">
              STEP {String(currentStep + 1).padStart(2, "0")}
            </span>
          </div>

          <span className="scg-step-category">{step.title}</span>

          <h2>{step.heading}</h2>

          <p className="scg-step-description">
            {step.description}
          </p>

          <div className="scg-tip-box">
            <span className="scg-tip-icon">💡</span>
            <div>
              <strong>AI Cooking Tip</strong>
              <p>{step.tip}</p>
            </div>
          </div>

          <div className="scg-time-info">
            <span>⏱️ Estimated time</span>
            <strong>{step.time}</strong>
          </div>

          <div className="scg-step-status">
            <span className="scg-status-dot"></span>
            {currentStep === 4 ? "Final Step" : "In Progress"}
          </div>

          <div className="scg-cooking-controls">
            <button
              className="scg-btn scg-prev-btn"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              ← Previous Step
            </button>

            <button
              className="scg-btn scg-next-btn"
              onClick={handleNext}
              disabled={currentStep === 4}
            >
              {currentStep === 4 ? "Completed ✓" : "Next Step →"}
            </button>
          </div>
        </section>
      </div>

      {/* Ask AI */}
      <section className="scg-card scg-ai-card">
        <div className="scg-ai-heading">
          <div className="scg-ai-icon">✨</div>
          <div>
            <span className="scg-small-label">GEMINI POWERED</span>
            <h2>Ask AI Cooking Guide</h2>
            <p>Have a cooking question? Your AI assistant is here to help.</p>
          </div>
        </div>

        <div className="scg-ai-input">
          <input
            type="text"
            placeholder="Ask anything about your cooking..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") askAI();
            }}
          />

          <button onClick={askAI} disabled={!question.trim()}>
            ✨ Ask Gemini AI
          </button>
        </div>

        <div className="scg-ai-suggestions">
          <span>Try asking:</span>
          <button onClick={() => setQuestion("How can I make my cutlets crispy?")}>
            How to make crispy cutlets?
          </button>
          <button onClick={() => setQuestion("What if my mixture is too soft?")}>
            Mixture too soft?
          </button>
        </div>
      </section>

      {/* Cooking Session */}
      <footer className="scg-session-footer">
        <div>
          <span className="scg-session-dot"></span>
          <strong>Cooking Session Active</strong>
        </div>
        <p>Illustrative UI layout. Actual recipe data and Gemini responses will be connected through Django API.</p>
      </footer>

    </div>
  );
}

export default SmartCookingGuide;
