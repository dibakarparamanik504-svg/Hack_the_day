
import React, { useState } from "react";
import "./SmartNutritionAnalyzer.css";

const nutritionData = {
  "Leftover Rice Vegetable Cutlet": {
    calories: 320,
    protein: 8,
    carbs: 48,
    fat: 10,
    fiber: 4,
    sugar: 3,
    sodium: 420,
    ingredients: "Rice, Potato, Vegetables",
    serving: "2 People",
    insights: [
      "Rice provides most of the carbohydrates.",
      "Potato and vegetables contribute fiber.",
      "Adding a protein-rich ingredient may improve protein content."
    ]
  },
  "Vegetable Rice Pancake": {
    calories: 280,
    protein: 7,
    carbs: 42,
    fat: 9,
    fiber: 5,
    sugar: 4,
    sodium: 350,
    ingredients: "Rice, Mixed Vegetables, Spices",
    serving: "2 People",
    insights: [
      "Rice is the main source of carbohydrates.",
      "Mixed vegetables contribute dietary fiber.",
      "Adding lentils or paneer may increase protein."
    ]
  },
  "Leftover Bread Vegetable Toast": {
    calories: 250,
    protein: 9,
    carbs: 35,
    fat: 8,
    fiber: 4,
    sugar: 3,
    sodium: 390,
    ingredients: "Bread, Vegetables, Spices",
    serving: "2 People",
    insights: [
      "Bread contributes most of the carbohydrates.",
      "Vegetables provide fiber and micronutrients.",
      "A protein-rich topping may improve nutritional balance."
    ]
  }
};

function SmartNutritionAnalyzer() {
  const [selectedRecipe, setSelectedRecipe] = useState(
    "Leftover Rice Vegetable Cutlet"
  );
  const [nutrition, setNutrition] = useState(nutritionData["Leftover Rice Vegetable Cutlet"]);
  const [analyzed, setAnalyzed] = useState(false);

  const analyzeNutrition = () => {
    setNutrition(nutritionData[selectedRecipe]);
    setAnalyzed(true);
  };

  const maxMacro = 50;

  return (
    <div className="nutrition-page">
      <header className="nutrition-header">
        <div className="nutrition-brand">
          <span className="nutrition-logo">🌿</span>
          <div>
            <h2>SMART CHEF</h2>
            <p>Smart Kitchen • Less Waste</p>
          </div>
        </div>
        <span className="nutrition-ai-badge">✦ Gemini AI</span>
      </header>

      <main className="nutrition-container">
        <section className="nutrition-heading">
          <span className="nutrition-label">SMART KITCHEN FEATURE</span>
          <h1>Smart Nutrition Analyzer</h1>
          <p>
            Analyze the estimated nutritional value of recipes made from
            leftover food.
          </p>
        </section>

        <section className="selected-recipe-card">
          <div>
            <span className="nutrition-label">SELECTED RECIPE</span>
            <h2>{selectedRecipe}</h2>
            <p>Main ingredients: {nutrition.ingredients}</p>
          </div>
          <div className="serving-info">
            <span>Serving size</span>
            <strong>{nutrition.serving}</strong>
          </div>
        </section>

        <section className="nutrition-section">
          <div className="section-heading">
            <span>01.</span>
            <h2>Nutrition Overview</h2>
          </div>

          <div className="nutrition-overview-grid">
            <div className="nutrition-stat">
              <span>🔥</span>
              <h3>{nutrition.calories}</h3>
              <strong>Calories (kcal)</strong>
              <p>Per serving</p>
            </div>

            <div className="nutrition-stat">
              <span>💪</span>
              <h3>{nutrition.protein}g</h3>
              <strong>Protein</strong>
              <p>Per serving</p>
            </div>

            <div className="nutrition-stat">
              <span>🌾</span>
              <h3>{nutrition.carbs}g</h3>
              <strong>Carbohydrates</strong>
              <p>Per serving</p>
            </div>

            <div className="nutrition-stat">
              <span>🥑</span>
              <h3>{nutrition.fat}g</h3>
              <strong>Fat</strong>
              <p>Per serving</p>
            </div>
          </div>
        </section>

        <section className="nutrition-section">
          <div className="section-heading">
            <span>02.</span>
            <h2>Macronutrient Distribution</h2>
          </div>

          <div className="macro-card">
            {[
              { name: "Carbohydrates", value: nutrition.carbs, color: "#65a978" },
              { name: "Protein", value: nutrition.protein, color: "#e5aa58" },
              { name: "Fat", value: nutrition.fat, color: "#7299d5" }
            ].map((macro) => (
              <div className="macro-item" key={macro.name}>
                <div className="macro-label">
                  <strong>{macro.name}</strong>
                  <span>{macro.value}g</span>
                </div>
                <div className="macro-track">
                  <div
                    className="macro-fill"
                    style={{
                      width: `${(macro.value / maxMacro) * 100}%`,
                      backgroundColor: macro.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="nutrition-section">
          <div className="section-heading">
            <span>03.</span>
            <h2>Additional Nutrition Information</h2>
          </div>

          <div className="additional-nutrition">
            <div>
              <span>Dietary Fiber</span>
              <strong>{nutrition.fiber}g</strong>
            </div>
            <div>
              <span>Sugar</span>
              <strong>{nutrition.sugar}g</strong>
            </div>
            <div>
              <span>Sodium</span>
              <strong>{nutrition.sodium}mg</strong>
            </div>
          </div>
        </section>

        <section className="nutrition-section">
          <div className="section-heading">
            <span>04.</span>
            <h2>AI Nutrition Insights</h2>
          </div>

          <div className="ai-insights-card">
            <div className="ai-insights-title">
              <span>✦</span>
              <div>
                <h3>AI Analysis</h3>
                <p>Nutrition observations for your recipe</p>
              </div>
            </div>

            <ul>
              {nutrition.insights.map((insight, index) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
            <span className="demo-note">Demo insights — Gemini API not connected</span>
          </div>
        </section>

        <section className="analyze-another-card">
          <h2>Analyze Another Recipe</h2>
          <p>Choose a recipe to calculate its estimated nutrition.</p>

          <label htmlFor="nutrition-recipe">Select Recipe</label>
          <select
            id="nutrition-recipe"
            value={selectedRecipe}
            onChange={(e) => {
              setSelectedRecipe(e.target.value);
              setAnalyzed(false);
            }}
          >
            {Object.keys(nutritionData).map((recipe) => (
              <option key={recipe} value={recipe}>
                {recipe}
              </option>
            ))}
          </select>

          <button onClick={analyzeNutrition}>
            Analyze Nutrition →
          </button>

          {analyzed && (
            <p className="analysis-success">
              ✓ Demo nutrition data updated successfully.
            </p>
          )}
        </section>

        <p className="nutrition-disclaimer">
          Note: সব nutrition values উদাহরণস্বরূপ। প্রকৃত হিসাব ingredient
          quantity, cooking method ও serving size অনুযায়ী বদলাবে।
        </p>
      </main>
    </div>
  );
}

export default SmartNutritionAnalyzer;
