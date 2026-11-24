import { useRef, useState } from "react";
import "./generate.css";

function Generate() {
  const [ingredients, setIngredients] = useState(["Cooked rice"]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState("1–2 portions");
  const [storage, setStorage] = useState("");
  const [duration, setDuration] = useState("");
  const [diet, setDiet] = useState("");
  const [allergies, setAllergies] = useState("");
  const [recipeType, setRecipeType] = useState("");
  const [cookingTime, setCookingTime] = useState("Any time");
  const [servings, setServings] = useState("2");
  const [difficulty, setDifficulty] = useState("Any");
  const [safetyChecked, setSafetyChecked] = useState(false);

  const fileRef = useRef(null);
  const cameraRef = useRef(null);

  const addIngredient = () => {
    const value = ingredientInput.trim();

    if (
      value &&
      !ingredients.some(
        (item) => item.toLowerCase() === value.toLowerCase()
      )
    ) {
      setIngredients([...ingredients, value]);
      setIngredientInput("");
    }
  };

  const removeIngredient = (item) => {
    setIngredients(ingredients.filter((i) => i !== item));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("Please upload JPG, PNG or WEBP image.");
      return;
    }

    setImage({
      file,
      url: URL.createObjectURL(file),
    });
  };

  const handleGenerate = (e) => {
    e.preventDefault();

    if (!ingredients.length && !image) {
      alert("Please add ingredients or upload a food image.");
      return;
    }

    if (!safetyChecked) {
      alert("Please acknowledge the food safety notice.");
      return;
    }

    alert("Connect your Django and Gemini API to generate recipes.");
  };

  return (
    <div className="app-shell">

      {/* NAVBAR */}

      <header className="topbar">

        <a href="/" className="brand">
          <span className="brand-icon">🌿</span>
          <span>
            ZERO-WASTE
            <b>KITCHEN AI</b>
          </span>
        </a>

        <nav className="navigation">
          <a href="/">HOME</a>
          <a href="/generate" className="selected">GENERATE</a>
          <a href="/explore">EXPLORE</a>
          <a href="/saved">SAVED</a>
          <a href="/tracker">TRACKER</a>
        </nav>

        <div className="topbar-label">
          <span className="online-dot"></span>
          GEMINI AI STUDIO
        </div>

      </header>

      <main className="generate-page">

        {/* PAGE INTRO */}

        <section className="page-intro">

          <div className="intro-label">
            ✳ GEMINI AI RECIPE STUDIO
          </div>

          <h1>
            AI Recipe <span>Generator</span>
          </h1>

          <p>
            Turn your leftover ingredients into something delicious.
          </p>

          <div className="intro-rule">
            <span></span>
            <span></span>
            <span></span>
          </div>

        </section>

        <form className="generator-layout" onSubmit={handleGenerate}>

          <div className="form-column">

            {/* 01 INGREDIENTS */}

            <section className="panel">

              <div className="panel-heading">
                <div className="section-number">01</div>

                <div>
                  <div className="panel-eyebrow">
                    START WITH WHAT YOU HAVE
                  </div>

                  <h2>Add Your Leftover Food</h2>
                </div>
              </div>

              <div className="upload-label">
                UPLOAD FOOD IMAGE
              </div>

              <div
                className="upload-zone"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();

                  const file = e.dataTransfer.files[0];

                  if (file && ["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
                    setImage({
                      file,
                      url: URL.createObjectURL(file),
                    });
                  }
                }}
              >

                {image ? (
                  <div className="image-preview">

                    <img src={image.url} alt="Selected food" />

                    <div className="image-meta">
                      <b>{image.file.name}</b>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        URL.revokeObjectURL(image.url);
                        setImage(null);
                      }}
                    >
                      Remove Image
                    </button>

                  </div>
                ) : (
                  <>
                    <div className="upload-symbol">↑</div>

                    <h3>Drag & Drop Food Image</h3>

                    <p>JPG, PNG or WEBP</p>

                    <div className="upload-actions">

                      <button
                        type="button"
                        className="small-button dark"
                        onClick={() => fileRef.current.click()}
                      >
                        Choose Image
                      </button>

                      <button
                        type="button"
                        className="small-button outline"
                        onClick={() => cameraRef.current.click()}
                      >
                        ◎ Take Photo
                      </button>

                    </div>
                  </>
                )}

                <input
                  ref={fileRef}
                  hidden
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImage}
                />

                <input
                  ref={cameraRef}
                  hidden
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImage}
                />

              </div>

              <div className="or-divider">
                <span></span>
                OR ENTER INGREDIENTS MANUALLY
                <span></span>
              </div>

              <div className="ingredient-entry">

                <input
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addIngredient();
                    }
                  }}
                  placeholder="Enter ingredient..."
                />

                <button
                  type="button"
                  className="add-button"
                  onClick={addIngredient}
                >
                  + Add Ingredient
                </button>

              </div>

              <div className="ingredient-chips">

                {ingredients.map((item) => (
                  <span className="ingredient-chip" key={item}>
                    {item}

                    <button
                      type="button"
                      onClick={() => removeIngredient(item)}
                    >
                      ×
                    </button>
                  </span>
                ))}

              </div>

            </section>

            {/* 02 FOOD DETAILS */}

            <section className="panel">

              <div className="panel-heading">
                <div className="section-number">02</div>

                <div>
                  <div className="panel-eyebrow">
                    FOOD INFORMATION
                  </div>

                  <h2>Food Details</h2>
                </div>
              </div>

              <div className="fields-grid">

                <label className="field">
                  <span>Quantity</span>

                  <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                    <option>1 portion</option>
                    <option>1–2 portions</option>
                    <option>2–3 portions</option>
                    <option>3–4 portions</option>
                    <option>More than 4 portions</option>
                  </select>
                </label>

                <label className="field">
                  <span>Storage</span>

                  <select value={storage} onChange={(e) => setStorage(e.target.value)}>
                    <option value="">Select storage</option>
                    <option>Refrigerated</option>
                    <option>Frozen</option>
                    <option>Room temperature</option>
                    <option>Not sure</option>
                  </select>
                </label>

                <label className="field">
                  <span>How long has it been stored?</span>

                  <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                    <option value="">Select duration</option>
                    <option>Less than 2 hours</option>
                    <option>2–4 hours</option>
                    <option>4–24 hours</option>
                    <option>1–2 days</option>
                    <option>3–4 days</option>
                    <option>More than 4 days</option>
                    <option>Not sure</option>
                  </select>
                </label>

                <label className="field">
                  <span>Dietary Preference</span>

                  <select value={diet} onChange={(e) => setDiet(e.target.value)}>
                    <option value="">Choose preference</option>
                    <option>Vegetarian</option>
                    <option>Vegan</option>
                    <option>Eggetarian</option>
                    <option>Non-vegetarian</option>
                    <option>No preference</option>
                  </select>
                </label>

                <label className="field full-field">
                  <span>Allergies</span>

                  <input
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder="e.g. peanuts, dairy, gluten"
                  />
                </label>

              </div>

              <p className="field-note">
                Share accurate storage details. When in doubt about food safety,
                do not taste the food to check it.
              </p>

            </section>

            {/* 03 CUSTOMIZE */}

            <section className="panel">

              <div className="panel-heading">
                <div className="section-number">03</div>

                <div>
                  <div className="panel-eyebrow">
                    MAKE IT YOUR WAY
                  </div>

                  <h2>Customize Your Recipe</h2>
                </div>
              </div>

              <div className="fields-grid">

                <label className="field">
                  <span>Recipe Type</span>

                  <select value={recipeType} onChange={(e) => setRecipeType(e.target.value)}>
                    <option value="">Choose recipe type</option>
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                    <option>Snack</option>
                    <option>Dessert</option>
                    <option>Any type</option>
                  </select>
                </label>

                <label className="field">
                  <span>Number of Servings</span>

                  <select value={servings} onChange={(e) => setServings(e.target.value)}>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "serving" : "servings"}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="field full-field">
                  <span>Cooking Time</span>

                  <div className="choice-row">

                    {["Any time", "Under 15 minutes", "Under 30 minutes", "Under 45 minutes"].map((time) => (
                      <button
                        type="button"
                        key={time}
                        className={`choice-pill ${cookingTime === time ? "active" : ""}`}
                        onClick={() => setCookingTime(time)}
                      >
                        {time}
                      </button>
                    ))}

                  </div>
                </div>

                <div className="field full-field">
                  <span>Difficulty</span>

                  <div className="choice-row">

                    {["Easy", "Medium", "Any"].map((level) => (
                      <button
                        type="button"
                        key={level}
                        className={`choice-pill ${difficulty === level ? "active" : ""}`}
                        onClick={() => setDifficulty(level)}
                      >
                        {level}
                      </button>
                    ))}

                  </div>
                </div>

              </div>

            </section>

            {/* 04 FOOD SAFETY */}

            <section className="safety-panel">

              <div className="safety-icon">!</div>

              <div className="safety-content">

                <div className="safety-kicker">
                  04 — RESPONSIBLE COOKING
                </div>

                <h2>AI Food Safety Verification</h2>

                <h3>Safety Screening</h3>

                <p>
                  Check storage history, food condition and possible spoilage.
                  Image recognition alone cannot confirm food safety.
                </p>

                <label className="safety-consent">

                  <input
                    type="checkbox"
                    checked={safetyChecked}
                    onChange={(e) => setSafetyChecked(e.target.checked)}
                  />

                  <span>
                    I understand that AI suggestions are not a guarantee of
                    food safety. I will inspect food carefully and follow
                    reliable food-safety guidance.
                  </span>

                </label>

              </div>

            </section>

            {/* 05 GENERATE */}

            <section className="generate-cta">

              <div className="cta-kicker">
                05 — LET AI GET CREATIVE
              </div>

              <h2>Ready to Create Something Delicious?</h2>

              <p>
                Gemini AI will analyze your ingredients and generate suitable recipes.
              </p>

              <button className="generate-button" type="submit">
                ✧ Generate AI Recipe →
              </button>

              <small>
                Powered by Gemini · Your kitchen, reimagined
              </small>

            </section>

          </div>

          {/* 06 RESULTS */}

          <aside className="results-column">

            <div className="results-card">

              <div className="results-top">
                ✧ 06 — AI RECIPE RESULTS
              </div>

              <div className="results-status">
                <span className="status-dot"></span>
                GENERATED BY GEMINI AI
              </div>

              <h2>
                Recipe<br />
                <em>Suggestions</em>
              </h2>

              <div className="result-plate">
                <div className="result-plate-inner">
                  ✳
                  <b>AI</b>
                </div>
              </div>

              <h3>Your Personalized Recipes</h3>

              <p className="results-description">
                Your recipe ideas will appear here after you generate them.
              </p>

              <div className="result-includes">

                <div className="includes-title">
                  EACH RESULT WILL INCLUDE
                </div>

                <ul>
                  <li>Recipe name and description</li>
                  <li>Ingredients and quantities</li>
                  <li>Step-by-step cooking instructions</li>
                  <li>Preparation and cooking time</li>
                  <li>Nutrition estimates</li>
                  <li>Suggested ingredient alternatives</li>
                  <li>Save, download and share actions</li>
                </ul>

              </div>

              <div className="results-footer">
                🌿 ZERO-WASTE KITCHEN AI
                <br />
                POWERED BY GEMINI
              </div>

            </div>

            <div className="side-tip">
              <span>✦</span>

              <div>
                <b>A little kitchen wisdom</b>

                <p>
                  AI cannot reliably detect harmful bacteria or toxins.
                </p>
              </div>
            </div>

          </aside>

        </form>

      </main>

      <footer className="footer">
        <span>© 2026 ZERO-WASTE KITCHEN AI</span>
        <span>TURN LEFTOVERS INTO POSSIBILITIES.</span>
      </footer>

    </div>
  );
}

export default Generate;