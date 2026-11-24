
import { useMemo, useState } from "react";
import "./explore.css";

const recipes = [
  {
    id: 1,
    name: "Leftover Rice Pancakes",
    category: "Breakfast",
    ingredients: ["Leftover Rice", "Vegetables"],
    cuisine: "Bengali",
    time: 15,
    difficulty: "Easy",
    description: "A crispy and delicious pancake made using leftover rice.",
    instructions: [
      "Mash the leftover rice in a bowl.",
      "Add chopped vegetables and spices.",
      "Mix everything into a thick batter.",
      "Cook small pancakes on a greased pan.",
      "Serve hot with chutney."
    ],
    nutrition: "Approx. 180 kcal per serving",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700"
  },
  {
    id: 2,
    name: "Roti Vegetable Wrap",
    category: "Lunch",
    ingredients: ["Roti", "Vegetables"],
    cuisine: "North Indian",
    time: 20,
    difficulty: "Easy",
    description: "A healthy wrap prepared with leftover roti and vegetables.",
    instructions: [
      "Chop the leftover vegetables.",
      "Heat the vegetables with spices.",
      "Warm the roti on a pan.",
      "Place the filling inside the roti.",
      "Roll and serve."
    ],
    nutrition: "Approx. 220 kcal per serving",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=700"
  },
  {
    id: 3,
    name: "Crispy Potato Snacks",
    category: "Snacks",
    ingredients: ["Potato", "Vegetables"],
    cuisine: "North Indian",
    time: 25,
    difficulty: "Easy",
    description: "Crispy potato bites made from leftover boiled potatoes.",
    instructions: [
      "Mash the boiled potatoes.",
      "Add vegetables and spices.",
      "Shape into small patties.",
      "Shallow fry until golden.",
      "Serve with sauce."
    ],
    nutrition: "Approx. 200 kcal per serving",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=700"
  },
  {
    id: 4,
    name: "Vegetable Bread Toast",
    category: "Breakfast",
    ingredients: ["Bread", "Vegetables"],
    cuisine: "Chinese-Indian",
    time: 12,
    difficulty: "Easy",
    description: "A quick toast using leftover bread and fresh vegetables.",
    instructions: [
      "Chop the vegetables.",
      "Mix with spices and a little sauce.",
      "Spread the mixture on bread.",
      "Toast until crisp.",
      "Serve immediately."
    ],
    nutrition: "Approx. 160 kcal per serving",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700"
  },
  {
    id: 5,
    name: "Dal Vegetable Soup",
    category: "Dinner",
    ingredients: ["Dal", "Vegetables"],
    cuisine: "Bengali",
    time: 30,
    difficulty: "Easy",
    description: "A comforting soup made with leftover dal and vegetables.",
    instructions: [
      "Heat the leftover dal in a pan.",
      "Add chopped vegetables.",
      "Add water and adjust consistency.",
      "Simmer until vegetables are cooked.",
      "Serve warm."
    ],
    nutrition: "Approx. 150 kcal per serving",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=700"
  },
  {
    id: 6,
    name: "Paneer Roti Rolls",
    category: "Snacks",
    ingredients: ["Paneer", "Roti"],
    cuisine: "North Indian",
    time: 25,
    difficulty: "Medium",
    description: "A tasty roll using leftover roti and paneer filling.",
    instructions: [
      "Crumble the paneer.",
      "Cook with spices and vegetables.",
      "Warm the roti.",
      "Add the paneer filling.",
      "Roll and serve."
    ],
    nutrition: "Approx. 240 kcal per serving",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=700"
  },
  {
    id: 7,
    name: "Vegetable Pasta Stir Fry",
    category: "Dinner",
    ingredients: ["Pasta", "Vegetables"],
    cuisine: "Mediterranean",
    time: 20,
    difficulty: "Easy",
    description: "A quick stir fry using leftover pasta and vegetables.",
    instructions: [
      "Heat a little oil in a pan.",
      "Add chopped vegetables.",
      "Add leftover pasta.",
      "Season and stir fry.",
      "Serve hot."
    ],
    nutrition: "Approx. 260 kcal per serving",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700"
  },
  {
    id: 8,
    name: "South Indian Rice Upma",
    category: "Breakfast",
    ingredients: ["Leftover Rice", "Vegetables"],
    cuisine: "South Indian",
    time: 15,
    difficulty: "Easy",
    description: "A simple South Indian-inspired dish made with leftover rice.",
    instructions: [
      "Heat oil and add mustard seeds.",
      "Add vegetables and curry leaves.",
      "Add leftover rice.",
      "Mix and cook for a few minutes.",
      "Serve warm."
    ],
    nutrition: "Approx. 190 kcal per serving",
    image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=700"
  }
];

const categories = [
  { name: "Breakfast", icon: "☀️" },
  { name: "Lunch", icon: "🍱" },
  { name: "Dinner", icon: "🍲" },
  { name: "Snacks", icon: "🥪" },
  { name: "Vegetarian", icon: "🥬" },
  { name: "Regional Food", icon: "🌏" }
];

const ingredients = [
  "Leftover Rice",
  "Roti",
  "Vegetables",
  "Bread",
  "Potato",
  "Dal",
  "Paneer",
  "Pasta"
];

const cuisines = [
  "Bengali",
  "North Indian",
  "South Indian",
  "Chinese-Indian",
  "Mediterranean"
];

const collections = [
  "Zero-Waste Breakfast Ideas",
  "Budget-Friendly Meals",
  "Quick Leftover Snacks",
  "Creative Rice Recipes",
  "No-Waste Family Meals"
];

function Explore({setname}) {
  setname("Explore")
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [ingredient, setIngredient] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [time, setTime] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        recipe.name.toLowerCase().includes(search.toLowerCase()) ||
        recipe.ingredients.some(item =>
          item.toLowerCase().includes(search.toLowerCase())
        );

      const matchesCategory =
        category === "All" ||
        recipe.category === category ||
        (category === "Vegetarian" &&
          recipe.ingredients.some(item =>
            ["Vegetables", "Potato", "Paneer", "Dal"].includes(item)
          )) ||
        (category === "Regional Food" && true);

      const matchesIngredient =
        !ingredient || recipe.ingredients.includes(ingredient);

      const matchesCuisine =
        !cuisine || recipe.cuisine === cuisine;

      const matchesTime =
        time === "All" ||
        (time === "15" && recipe.time < 15) ||
        (time === "30" && recipe.time <= 30) ||
        (time === "45" && recipe.time <= 45);

      return matchesSearch && matchesCategory &&
        matchesIngredient && matchesCuisine && matchesTime;
    });
  }, [search, category, ingredient, cuisine, time]);

  const selectCategory = (value) => {
    setCategory(value);
    setIngredient("");
    setCuisine("");
    document.getElementById("recipe-results")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const selectCollection = (value) => {
    if (value.includes("Breakfast")) setCategory("Breakfast");
    else if (value.includes("Snacks")) setCategory("Snacks");
    else if (value.includes("Rice")) setIngredient("Leftover Rice");
    else setCategory("All");

    document.getElementById("recipe-results")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setIngredient("");
    setCuisine("");
    setTime("All");
  };

  return (
    <div className="explore-page">
      {/* HERO */}
      <section className="explore-hero">
        <div className="explore-hero-content">
          <span className="explore-eyebrow">DISCOVER & LEARN</span>
          <h1>Explore Creative <span>Recipes.</span></h1>
          <p>
            Discover delicious meals made from everyday leftover
            ingredients. Explore new ideas and make every ingredient count.
          </p>

          <div className="explore-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search recipes or ingredients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={() =>
              document.getElementById("recipe-results")?.scrollIntoView({
                behavior: "smooth"
              })
            }>
              Search
            </button>
          </div>

          <div className="explore-hero-tags">
            <span>♻ Sustainable Cooking</span>
            <span>🥗 Creative Meals</span>
            <span>🌱 Less Food Waste</span>
          </div>
        </div>

        <div className="explore-hero-image">
          <img
            src="https://images.unsplash.com/photo-1547592180-85f173990554?w=900"
            alt="Fresh vegetable meal"
          />
          <div className="explore-image-label">
            <span>🌿 SMART CHEF  </span>
            <div>
              <strong>Cook Smart. Waste Less.</strong>
              <small>Every ingredient has potential.</small>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="explore-section">
        <div className="explore-section-heading">
          <div>
            <span className="explore-number">01 — BROWSE CATEGORIES</span>
            <h2>What would you like to explore?</h2>
          </div>
          <button className="explore-text-button" onClick={clearFilters}>
            View all recipes →
          </button>
        </div>

        <div className="explore-category-grid">
          {categories.map((item) => (
            <button
              className={`explore-category-card ${
                category === item.name ? "selected" : ""
              }`}
              key={item.name}
              onClick={() => selectCategory(item.name)}
            >
              <span className="explore-category-icon">{item.icon}</span>
              <strong>{item.name}</strong>
              <span className="explore-card-link">Browse recipes →</span>
            </button>
          ))}
        </div>
      </section>

      {/* INGREDIENTS */}
      <section className="explore-section explore-ingredient-section">
        <div className="explore-section-heading">
          <div>
            <span className="explore-number">02 — POPULAR LEFTOVER INGREDIENTS</span>
            <h2>What's in your kitchen?</h2>
            <p>Choose an ingredient to discover recipes using it.</p>
          </div>
        </div>

        <div className="explore-ingredient-list">
          {ingredients.map((item, index) => (
            <button
              key={item}
              className={`explore-ingredient-chip ${
                ingredient === item ? "selected" : ""
              }`}
              onClick={() => {
                setIngredient(ingredient === item ? "" : item);
                setCategory("All");
              }}
            >
              <span>{["🍚", "🫓", "🥦", "🍞", "🥔", "🍲", "🧀", "🍝"][index]}</span>
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* CUISINE */}
      <section className="explore-section">
        <div className="explore-section-heading">
          <div>
            <span className="explore-number">03 — REGIONAL CUISINE</span>
            <h2>Explore flavours around the world.</h2>
          </div>
        </div>

        <div className="explore-cuisine-grid">
          {cuisines.map((item, index) => (
            <button
              key={item}
              className={`explore-cuisine-card ${
                cuisine === item ? "selected" : ""
              }`}
              onClick={() => {
                setCuisine(cuisine === item ? "" : item);
                setCategory("All");
              }}
            >
              <span>{["🇮🇳", "🍛", "🥥", "🥡", "🥗"][index]}</span>
              <strong>{item} Recipes</strong>
              <small>Discover cuisine →</small>
            </button>
          ))}
        </div>
      </section>

      {/* TIME FILTER */}
      <section className="explore-time-section">
        <div>
          <span className="explore-number">04 — QUICK RECIPE DISCOVERY</span>
          <h2>Short on time? Cook something quick.</h2>
        </div>

        <div className="explore-time-options">
          {[
            { label: "All recipes", value: "All" },
            { label: "Under 15 min", value: "15" },
            { label: "Under 30 min", value: "30" },
            { label: "Under 45 min", value: "45" }
          ].map((item) => (
            <button
              key={item.value}
              className={time === item.value ? "selected" : ""}
              onClick={() => setTime(item.value)}
            >
              ⏱ {item.label}
            </button>
          ))}
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="explore-section">
        <div className="explore-section-heading">
          <div>
            <span className="explore-number">05 — RECIPE COLLECTIONS</span>
            <h2>Curated ideas for every kitchen.</h2>
          </div>
        </div>

        <div className="explore-collection-grid">
          {collections.map((item, index) => (
            <button
              className="explore-collection-card"
              key={item}
              onClick={() => selectCollection(item)}
            >
              <span>0{index + 1}</span>
              <strong>{item}</strong>
              <small>Explore collection ↗</small>
            </button>
          ))}
        </div>
      </section>

      {/* RECIPE RESULTS */}
      <section className="explore-section" id="recipe-results">
        <div className="explore-section-heading">
          <div>
            <span className="explore-number">DISCOVER SOMETHING DELICIOUS</span>
            <h2>Recipes to explore.</h2>
            <p>
              {filteredRecipes.length} recipes found
              {ingredient ? ` using ${ingredient}` : ""}
              {cuisine ? ` · ${cuisine}` : ""}
            </p>
          </div>
          <button className="explore-text-button" onClick={clearFilters}>
            Clear filters ↗
          </button>
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="explore-recipe-grid">
            {filteredRecipes.map((recipe) => (
              <article className="explore-recipe-card" key={recipe.id}>
                <div className="explore-recipe-image">
                  <img src={recipe.image} alt={recipe.name} />
                  <span>{recipe.category}</span>
                </div>

                <div className="explore-recipe-content">
                  <div className="explore-recipe-meta">
                    <span>⏱ {recipe.time} min</span>
                    <span>• {recipe.difficulty}</span>
                  </div>

                  <h3>{recipe.name}</h3>
                  <p>{recipe.description}</p>

                  <div className="explore-recipe-ingredients">
                    {recipe.ingredients.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>

                  <button
                    className="explore-details-button"
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    View recipe details →
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="explore-empty">
            <span>🔎</span>
            <h3>No recipes found.</h3>
            <p>Try another ingredient, category or cooking time.</p>
            <button onClick={clearFilters}>Clear all filters</button>
          </div>
        )}
      </section>

      {/* RECIPE DETAILS MODAL */}
      {selectedRecipe && (
        <div
          className="explore-modal-overlay"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="explore-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="explore-modal-close"
              onClick={() => setSelectedRecipe(null)}
            >
              ×
            </button>

            <img
              className="explore-modal-image"
              src={selectedRecipe.image}
              alt={selectedRecipe.name}
            />

            <div className="explore-modal-content">
              <span className="explore-number">RECIPE DETAILS</span>
              <h2>{selectedRecipe.name}</h2>
              <p>{selectedRecipe.description}</p>

              <div className="explore-modal-stats">
                <span>⏱ {selectedRecipe.time} min</span>
                <span>◈ {selectedRecipe.difficulty}</span>
                <span>🌏 {selectedRecipe.cuisine}</span>
              </div>

              <h3>Required leftover ingredients</h3>
              <div className="explore-recipe-ingredients">
                {selectedRecipe.ingredients.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <h3>Cooking instructions</h3>
              <ol className="explore-instructions">
                {selectedRecipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>

              <div className="explore-nutrition">
                <strong>Estimated nutrition</strong>
                <p>{selectedRecipe.nutrition}</p>
                <small>
                  Estimates are illustrative and may vary with ingredients
                  and serving sizes.
                </small>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="explore-footer">
        <div href="/" className="explore-logo">🌿 SMART CHEF</div>
        <p>Discover more. Waste less. Cook creatively.</p>
        <span>© 2026 SMART CHEF. All rights reserved.</span>
      </footer>

    </div>
  );
}

export default Explore;
